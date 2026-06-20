import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const figmaData = JSON.parse(readFileSync(resolve(__dirname, '../figma-file.json'), 'utf-8'));

function findNode(node: any, targetId: string): any {
  if (node.id === targetId) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findNode(child, targetId);
      if (found) return found;
    }
  }
  return null;
}

function findNodesByIdPrefix(node: any, prefix: string, results: any[] = []) {
  if (node.id && node.id.startsWith(prefix)) {
    results.push({ name: node.name, id: node.id, type: node.type });
  }
  if (node.children) {
    node.children.forEach((child: any) => findNodesByIdPrefix(child, prefix, results));
  }
  return results;
}

function findParent(node: any, targetId: string, parent: any = null): any {
  if (node.id === targetId) return parent;
  if (node.children) {
    for (const child of node.children) {
      const found = findParent(child, targetId, node);
      if (found) return found;
    }
  }
  return null;
}

console.log('Looking for node 265:280...');
const targetNode = findNode(figmaData.document, '265:280');

if (targetNode) {
  console.log('✓ Found!');
  console.log('Name:', targetNode.name);
  console.log('Type:', targetNode.type);
  console.log('ID:', targetNode.id);
  
  const parent = findParent(figmaData.document, '265:280');
  if (parent) {
    console.log('\nParent frame:');
    console.log('  Name:', parent.name);
    console.log('  ID:', parent.id);
    console.log('  Type:', parent.type);
    console.log('\n👉 Use this ID for analysis: --node-id=' + parent.id);
  }
} else {
  console.log('✗ Not found with ID 265:280');
  console.log('\nLooking for nodes starting with "265"...');
  const nodes265 = findNodesByIdPrefix(figmaData.document, '265');
  nodes265.forEach(n => console.log(`  - ${n.name} | ID: ${n.id} | Type: ${n.type}`));
  
  console.log('\nLooking for nodes starting with "265:"...');
  const nodes265Colon = findNodesByIdPrefix(figmaData.document, '265:');
  nodes265Colon.forEach(n => console.log(`  - ${n.name} | ID: ${n.id} | Type: ${n.type}`));
}
