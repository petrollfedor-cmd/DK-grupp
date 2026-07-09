import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const CERT_DIR = path.join(process.cwd(), 'public', 'documents', 'certificates');
const CERT_META_PATH = path.join(process.cwd(), 'data', 'certificates.json');

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
    return true;
  } catch (error) {
    console.error('Error updating navigation:', error);
    return false;
  }
}

export function updateHero(data: any): boolean {
  try {
    writeJSON('hero.json', data);
    return true;
  } catch (error) {
    console.error('Error updating hero:', error);
    return false;
  }
}

export function updateProjects(items: any[]): boolean {
  try {
    writeJSON('projects.json', items);
    return true;
  } catch (error) {
    console.error('Error updating projects:', error);
    return false;
  }
}

export function updateFooter(data: any): boolean {
  try {
    writeJSON('footer.json', data);
    return true;
  } catch (error) {
    console.error('Error updating footer:', error);
    return false;
  }
}

export function addProject(project: any): boolean {
  try {
    const content = getAllContent();
    const newProject = {
      ...project,
      id: content.projects.length > 0 ? Math.max(...content.projects.map((p: any) => p.id)) + 1 : 1
    };
    content.projects.push(newProject);
    return updateProjects(content.projects);
  } catch (error) {
    console.error('Error adding project:', error);
    return false;
  }
}

export function deleteProject(index: number): boolean {
  try {
    const content = getAllContent();
    content.projects.splice(index, 1);
    return updateProjects(content.projects);
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
}

export function updateProject(index: number, project: any): boolean {
  try {
    const content = getAllContent();
    if (index >= 0 && index < content.projects.length) {
      content.projects[index] = { ...content.projects[index], ...project };
      return updateProjects(content.projects);
    }
    return false;
  } catch (error) {
    console.error('Error updating project:', error);
    return false;
  }
}

// Certificate management
export function getCertificates(): Certificate[] {
  // Если есть метаданные — используем их
  if (fs.existsSync(CERT_META_PATH)) {
    const fileBuffer = fs.readFileSync(CERT_META_PATH);
    const data = fileBuffer.toString('utf-8');
    const certs = JSON.parse(data) as Certificate[];
    // Фильтруем только существующие файлы
    const validCerts = certs.filter(c => fs.existsSync(path.join(CERT_DIR, c.filename)));
    // Добавляем файлы из папки, которых нет в метаданных
    const existingFiles = fs.readdirSync(CERT_DIR).filter(f => /\.(pdf|png|jpg|jpeg)$/i.test(f));
    const missingFiles = existingFiles.filter(f => !certs.some(c => c.filename === f));
    if (missingFiles.length > 0) {
      missingFiles.forEach(f => {
        validCerts.push({ filename: f, name: f.replace(/\.[^.]+$/, '').replace(/_/g, ' '), category: 'other' });
      });
      saveCertificates(validCerts);
    }
    return validCerts;
  }
  // Если метаданных нет — сканируем папку
  if (!fs.existsSync(CERT_DIR)) return [];
  const files = fs.readdirSync(CERT_DIR).filter(f => /\.(pdf|png|jpg|jpeg)$/i.test(f));
  const certs: Certificate[] = files.map(f => ({
    filename: f,
    name: f.replace(/\.[^.]+$/, '').replace(/_/g, ' '),
    category: 'other' as const
  }));
  saveCertificates(certs);
  return certs;
}

export function saveCertificates(certificates: Certificate[]): void {
  writeJSON('certificates.json', certificates);
}

export function addCertificate(filename: string, name: string, category: string): boolean {
  try {
    const certs = getCertificates();
    // Проверяем, есть ли уже сертификат с таким filename
    if (certs.some(c => c.filename === filename)) {
      // Обновляем существующий сертификат
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

export function deleteCertificate(index: number): boolean {
  try {
    const certs = getCertificates();
    if (index >= 0 && index < certs.length) {
      const cert = certs[index];
      const filePath = path.join(CERT_DIR, cert.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
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
