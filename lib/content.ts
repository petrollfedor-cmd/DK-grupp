import fs from 'fs';
import path from 'path';
import { syncFileToGit } from './git-sync';

const DATA_DIR = path.join(process.cwd(), 'data');
const CERT_DIR = path.join(process.cwd(), 'public', 'documents', 'certificates');
const CERT_META_PATH = path.join(process.cwd(), 'data', 'certificates.json');

const GITHUB_REPO = process.env.GITHUB_REPO || 'petrollfedor-cmd/DK-grupp';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

export interface Certificate {
  filename: string;
  name: string;
  category: 'windows' | 'facade' | 'doors' | 'other';
}

export interface ContentData {
  navigation: any[];
  hero: any;
  projects: any[];
  footer: any;
}

// Кэш данных из GitHub
let githubCache: ContentData | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5000; // 5 секунд

/**
 * Читает JSON напрямую из GitHub через API
 */
async function readFromGitHub(filename: string): Promise<any | null> {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/data/${filename}?ref=${GITHUB_BRANCH}`;
  try {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    if (!GITHUB_TOKEN) return null;
    
    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    if (!res.ok) return null;
    
    const data = await res.json();
    // GitHub возвращает base64-encoded content
    const decoded = Buffer.from(data.content, 'base64').toString('utf-8');
    return JSON.parse(decoded);
  } catch (err) {
    console.error('Failed to fetch from GitHub:', filename, err);
    return null;
  }
}

export function readJSON<T>(filename: string): T | null {
  const filepath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filepath)) {
    return null;
  }
  const data = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(data);
}

export function writeJSON(filename: string, data: any): void {
  const filepath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * Получает актуальные данные из GitHub с кэшированием
 */
async function getGitHubContent(): Promise<ContentData> {
  const now = Date.now();
  if (githubCache && (now - cacheTimestamp) < CACHE_TTL) {
    return githubCache;
  }
  
  const [navigation, hero, projects, footer] = await Promise.all([
    readFromGitHub('navigation.json') || [],
    readFromGitHub('hero.json') || {},
    readFromGitHub('projects.json') || [],
    readFromGitHub('footer.json') || {},
  ]);
  
  githubCache = { navigation, hero, projects, footer };
  cacheTimestamp = now;
  return githubCache;
}

// Глобальные переменные для отложенной синхронизации
let pendingSyncFiles: { path: string; content: string }[] = [];

export function scheduleGitSync() {
  if (pendingSyncFiles.length === 0) return;
  
  const filesToSync = [...pendingSyncFiles];
  pendingSyncFiles = [];
  
  // Запускаем синхронизацию напрямую без setTimeout
  for (const { path: filePath, content } of filesToSync) {
    const filename = path.basename(filePath);
    syncFileToGit(filePath, content, `Update ${filename}`)
      .then((result: any) => {
        if (result.success) {
          console.log('✅ Synced to GitHub:', filePath);
        } else {
          console.error('❌ GitHub sync failed:', result.message);
        }
      })
      .catch((err: any) => {
        console.error('❌ GitHub sync error:', err);
      });
  }
}

export function getAllContent(): ContentData {
  return {
    navigation: readJSON('navigation.json') || [],
    hero: readJSON('hero.json') || {},
    projects: readJSON('projects.json') || [],
    footer: readJSON('footer.json') || {}
  };
}

export function updateNavigation(items: any[]): boolean {
  try {
    writeJSON('navigation.json', items);
    pendingSyncFiles.push({ path: 'data/navigation.json', content: JSON.stringify(items, null, 2) });
    scheduleGitSync();
    githubCache = { ...githubCache!, navigation: items };
    cacheTimestamp = Date.now();
    return true;
  } catch (error) {
    console.error('Error updating navigation:', error);
    return false;
  }
}

export function updateHero(data: any): boolean {
  try {
    writeJSON('hero.json', data);
    pendingSyncFiles.push({ path: 'data/hero.json', content: JSON.stringify(data, null, 2) });
    scheduleGitSync();
    githubCache = { ...githubCache!, hero: data };
    cacheTimestamp = Date.now();
    return true;
  } catch (error) {
    console.error('Error updating hero:', error);
    return false;
  }
}

export function updateFooter(data: any): boolean {
  try {
    writeJSON('footer.json', data);
    pendingSyncFiles.push({ path: 'data/footer.json', content: JSON.stringify(data, null, 2) });
    scheduleGitSync();
    githubCache = { ...githubCache!, footer: data };
    cacheTimestamp = Date.now();
    return true;
  } catch (error) {
    console.error('Error updating footer:', error);
    return false;
  }
}

export function updateProjects(items: any[]): boolean {
  try {
    writeJSON('projects.json', items);
    pendingSyncFiles.push({ path: 'data/projects.json', content: JSON.stringify(items, null, 2) });
    scheduleGitSync();
    githubCache = { ...githubCache!, projects: items };
    cacheTimestamp = Date.now();
    return true;
  } catch (error) {
    console.error('Error updating projects:', error);
    return false;
  }
}

export async function addProject(project: any): Promise<boolean> {
  try {
    // Читаем из GitHub чтобы не потерять данные при перезапуске Railway
    const ghContent = await getGitHubContent();
    const newProject = {
      ...project,
      id: ghContent.projects.length > 0 ? Math.max(...ghContent.projects.map((p: any) => p.id)) + 1 : 1
    };
    ghContent.projects.push(newProject);
    return updateProjects(ghContent.projects);
  } catch (error) {
    console.error('Error adding project:', error);
    return false;
  }
}

export async function deleteProject(index: number): Promise<boolean> {
  try {
    const ghContent = await getGitHubContent();
    ghContent.projects.splice(index, 1);
    return updateProjects(ghContent.projects);
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
}

export async function updateProject(index: number, project: any): Promise<boolean> {
  try {
    const ghContent = await getGitHubContent();
    if (index >= 0 && index < ghContent.projects.length) {
      ghContent.projects[index] = { ...ghContent.projects[index], ...project };
      return updateProjects(ghContent.projects);
    }
    return false;
  } catch (error) {
    console.error('Error updating project:', error);
    return false;
  }
}

// Certificate management
async function readCertsFromGitHub(): Promise<Certificate[]> {
  try {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    if (!GITHUB_TOKEN) return [];
    
    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/data/certificates.json?ref=${GITHUB_BRANCH}`;
    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    if (!res.ok) return [];
    
    const data = await res.json();
    const decoded = Buffer.from(data.content, 'base64').toString('utf-8');
    return JSON.parse(decoded) as Certificate[];
  } catch (err) {
    console.error('Failed to fetch certificates from GitHub:', err);
    return [];
  }
}

export async function getCertificates(): Promise<Certificate[]> {
  return await readCertsFromGitHub();
}

export function saveCertificates(certificates: Certificate[]): void {
  writeJSON('certificates.json', certificates);
  pendingSyncFiles.push({ path: 'data/certificates.json', content: JSON.stringify(certificates, null, 2) });
  scheduleGitSync();
}

export async function addCertificate(filename: string, name: string, category: string): Promise<boolean> {
  try {
    const certs = await getCertificates();
    if (certs.some(c => c.filename === filename)) {
      const cert = certs.find(c => c.filename === filename);
      if (cert) {
        cert.name = name;
        cert.category = category as Certificate['category'];
      }
      saveCertificates(certs);
      return true;
    }
    certs.push({ filename, name, category: category as Certificate['category'] });
    saveCertificates(certs);
    return true;
  } catch (error) {
    console.error('Error adding certificate:', error);
    return false;
  }
}

export async function deleteCertificate(index: number): Promise<boolean> {
  try {
    const certs = await getCertificates();
    if (index >= 0 && index < certs.length) {
      certs.splice(index, 1);
      saveCertificates(certs);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting certificate:', error);
    return false;
  }
}
