import fetch from 'node-fetch';

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FILE_ID = 'pQIHOQsFOYlbfMQVUY88sx';

const imageIds = [
  '98:125', // лого белый
  '345:155', // сертификаты
  '167:21', // узлы
  '346:162', // опросный лист / каска
];

async function downloadImages() {
  if (!FIGMA_TOKEN) {
    console.error('FIGMA_TOKEN not found in .env.local');
    process.exit(1);
  }

  try {
    const response = await fetch(`https://api.figma.com/v1/files/${FILE_ID}/images`, {
      headers: {
        'X-FIGMA-TOKEN': FIGMA_TOKEN,
      },
    });

    const data = await response.json();
    
    if (!data.images) {
      console.error('No images in response:', data);
      process.exit(1);
    }

    const fs = require('fs');
    const path = require('path');
    const https = require('https');

    for (const [nodeId, url] of Object.entries(data.images as Record<string, string>)) {
      if (imageIds.includes(nodeId)) {
        console.log(`Downloading ${nodeId}...`);
        
        const imgResponse = await fetch(url);
        const buffer = await imgResponse.arrayBuffer();
        
        const extension = url.includes('png') ? 'png' : 'jpg';
        const filename = `${nodeId.replace(':', '_')}.${extension}`;
        const filepath = path.join(process.cwd(), 'public', 'figma', filename);
        
        fs.writeFileSync(filepath, Buffer.from(buffer));
        console.log(`✓ Saved: ${filename}`);
      }
    }

    console.log('\n✅ All images downloaded!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

downloadImages();
