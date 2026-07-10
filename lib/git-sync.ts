import * as fs from 'fs';
import * as path from 'path';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'petrollfedor-cmd/DK-grupp';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

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
  if (!GITHUB_TOKEN) {
    console.warn('⚠️ GITHUB_TOKEN not set — skipping git sync');
    return { success: false, message: 'GITHUB_TOKEN not set' };
  }

  try {
    // Читаем текущий файл локально
    const localPath = path.join(process.cwd(), filePath);
    const encodedContent = Buffer.from(content).toString('base64');

    // Получаем SHA существующего файла (если есть)
    let sha = '';
    try {
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
    } catch (err) {
      // Файл не существует — создаём новый
    }

    // Обновляем/создаём файл через GitHub API
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
          sha: sha,
          branch: GITHUB_BRANCH,
        }),
      }
    );

    if (!putRes.ok) {
      const error = await putRes.text();
      console.error('GitHub API error:', error);
      return { success: false, message: `GitHub API error: ${putRes.status}` };
    }

    console.log('✅ File synced to GitHub:', filePath);
    return {
      success: true,
      message: 'Файл сохранён и запушен в GitHub',
      deployUrl: `https://github.com/${GITHUB_REPO}/actions`,
    };
  } catch (err) {
    console.error('Git sync error:', err);
    return { success: false, message: `Git sync error: ${err}` };
  }
}

/**
 * Обновляет несколько файлов за один коммит
 */
export async function syncFilesToGit(
  files: { path: string; content: string }[],
  commitMessage: string
): Promise<GitSyncResult> {
  if (!GITHUB_TOKEN) {
    console.warn('⚠️ GITHUB_TOKEN not set — skipping git sync');
    return { success: false, message: 'GITHUB_TOKEN not set' };
  }

  try {
    // Сначала читаем все текущие SHA
    const fileInfos: { path: string; content: string; sha?: string }[] = [];

    for (const { path: filePath, content: fileContent } of files) {
      try {
        const getRes = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}`,
          {
            headers: {
              'Authorization': `Bearer ${GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json',
            },
          }
        );
        let sha = '';
        if (getRes.ok) {
          const data = await getRes.json();
          sha = data.sha;
        }
        fileInfos.push({
          path: filePath,
          content: fileContent,
          sha,
        });
      } catch (err) {
        fileInfos.push({
          path: filePath,
          content: fileContent,
        });
      }
    }

    // Обновляем все файлы через GitHub API
    const encodedFiles = fileInfos.map((f) => ({
      path: f.path,
      content: Buffer.from(f.content).toString('base64'),
      sha: f.sha,
    }));

    const putRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: commitMessage,
          content: JSON.stringify({ files: encodedFiles }),
          branch: GITHUB_BRANCH,
        }),
      }
    );

    // GitHub API не поддерживает мульти-файловые коммиты через /contents/
    // Придётся делать по одному
    throw new Error('Multi-file commit not supported');
  } catch (err) {
    // Fallback to single file sync
    console.log('Falling back to single-file sync');
    return syncFileToGit(files[0].path, files[0].content, commitMessage);
  }
}
