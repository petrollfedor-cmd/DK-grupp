import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

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
