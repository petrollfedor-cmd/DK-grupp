import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const FIGMA_API_BASE = 'https://api.figma.com/v1';

async function fetchFigmaFile(fileKey: string, token: string) {
  const res = await fetch(`${FIGMA_API_BASE}/files/${fileKey}`, {
    headers: {
      'X-Figma-Token': token,
    },
  });

  if (!res.ok) {
    throw new Error(`Figma file fetch failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

async function downloadImage(url: string, token: string, filePath: string) {
  const res = await fetch(url, {
    headers: {
      'X-Figma-Token': token,
    },
  });

  if (!res.ok) {
    throw new Error(`Image download failed: ${res.status} ${res.statusText}`);
  }

  const buffer = await res.arrayBuffer();
  fs.writeFileSync(filePath, Buffer.from(buffer));
}

async function main() {
  const fileKey = process.env.FIGMA_FILE_KEY;
  const token = process.env.FIGMA_PERSONAL_ACCESS_TOKEN;

  if (!fileKey || !token) {
    console.error('Missing FIGMA_FILE_KEY or FIGMA_PERSONAL_ACCESS_TOKEN');
    process.exit(1);
  }

  const figmaData: any = await fetchFigmaFile(fileKey, token);
  fs.writeFileSync(path.resolve(process.cwd(), 'figma-file.json'), JSON.stringify(figmaData, null, 2));

  const imageIds = [] as string[];
  function collectIds(node: any) {
    const fills = node.fills;
    if (Array.isArray(fills)) {
      const hasImageFill = fills.some((fill) => fill && fill.type === 'IMAGE');
      if (hasImageFill && node.id) {
        imageIds.push(node.id);
      }
    }
    if (node.children) {
      node.children.forEach(collectIds);
    }
  }
  collectIds(figmaData.document);

  if (imageIds.length === 0) {
    console.log('No image nodes found in Figma file document.');
    return;
  }

  const imageRes = await fetch(`${FIGMA_API_BASE}/images/${fileKey}?ids=${imageIds.join(',')}&format=png`, {
    headers: {
      'X-Figma-Token': token,
    },
  });
  const imageJson: any = await imageRes.json();

  const publicDir = path.resolve(process.cwd(), 'public', 'figma');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  for (const [id, url] of Object.entries(imageJson.images || {})) {
    if (!url) continue;
    const imagePath = path.resolve(publicDir, `${id}.png`);
    await downloadImage(url as string, token, imagePath);
    console.log(`Downloaded ${id}.png`);
  }

  console.log('Figma file saved to figma-file.json');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
