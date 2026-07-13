import * as fs from 'fs';
import * as path from 'path';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'petrollfedor-cmd/DK-grupp';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

console.log('🔧 Git sync config:', {
  hasToken: !!GITHUB_TOKEN,
  repo: GITHUB_REPO,
  branch: GITHUB_BRANCH,
});

interface GitSyncResult {
  success: boolean;
  message: string;
}

/**
 * Загружает бинарный файл (изображение) в GitHub через API
 */
export async function uploadFileToGitHub(
  repoPath: string,
  localFilePath: string,
  commitMessage: string
): Promise<GitSyncResult> {
  if (!GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN not set');
    return { success: false, message: 'GITHUB_TOKEN not set' };
  }

  try {
    // Убираем ведущий слеш для GitHub API
    const cleanPath = repoPath.replace(/^\//, '');
    
    // Читаем файл как бинарные данные
    if (!fs.existsSync(localFilePath)) {
      console.error('❌ File not found:', localFilePath);
      return { success: false, message: 'File not found: ' + localFilePath };
    }

    const fileBuffer = fs.readFileSync(localFilePath);
    const encodedContent = fileBuffer.toString('base64');

    let sha = '';
    const getRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${cleanPath}?ref=${GITHUB_BRANCH}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
    }

    const putRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${cleanPath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: commitMessage,
          content: encodedContent,
          sha: sha || undefined,
          branch: GITHUB_BRANCH,
        }),
      }
    );

    if (!putRes.ok) {
      const error = await putRes.text();
      console.error('❌ GitHub API error uploading file:', putRes.status, error);
      return { success: false, message: `GitHub API error: ${putRes.status}` };
    }

    console.log('✅ File uploaded to GitHub:', repoPath);
    return { success: true, message: 'Файл загружен в GitHub.' };
  } catch (err) {
    console.error('❌ File upload error:', err);
    return { success: false, message: `File upload error: ${err}` };
  }
}

export async function syncFileToGit(
  filePath: string,
  content: string,
  commitMessage: string
): Promise<GitSyncResult> {
  if (!GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN not set');
    return { success: false, message: 'GITHUB_TOKEN not set' };
  }

  try {
    const encodedContent = Buffer.from(content).toString('base64');

    let sha = '';
    const getRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
    }

    const putRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: commitMessage,
          content: encodedContent,
          sha: sha || undefined,
          branch: GITHUB_BRANCH,
        }),
      }
    );

    if (!putRes.ok) {
      const error = await putRes.text();
      console.error('❌ GitHub API error:', putRes.status, error);
      return { success: false, message: `GitHub API error: ${putRes.status}` };
    }

    console.log('✅ File synced to GitHub:', filePath);
    return { success: true, message: 'Файл сохранён и запушен в GitHub.' };
  } catch (err) {
    console.error('❌ Git sync error:', err);
    return { success: false, message: `Git sync error: ${err}` };
  }
}
