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
  deployUrl?: string;
}

/**
 * Обновляет файл через GitHub API и делает commit
 */
export async function syncFileToGit(
  filePath: string,
  content: string,
  commitMessage: string
): Promise<GitSyncResult> {
  console.log('📤 syncFileToGit called:', filePath);

  if (!GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN not set — cannot sync');
    return { success: false, message: 'GITHUB_TOKEN not set' };
  }

  try {
    const encodedContent = Buffer.from(content).toString('base64');

    // Получаем SHA существующего файла
    let sha = '';
    console.log('📥 Fetching SHA for:', filePath);
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
      console.log('✅ Found file, SHA:', sha);
    } else {
      console.log('⚠️ File not found on GitHub (will create new):', getRes.status);
    }

    // Обновляем/создаём файл
    console.log('📤 Pushing to GitHub:', filePath);
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
      return { success: false, message: `GitHub API error: ${putRes.status} - ${error}` };
    }

    console.log('✅ File synced to GitHub:', filePath);
    return {
      success: true,
      message: 'Файл сохранён и запушен в GitHub',
    };
  } catch (err) {
    console.error('❌ Git sync error:', err);
    return { success: false, message: `Git sync error: ${err}` };
  }
}


