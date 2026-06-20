import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const FIGMA_API_BASE = 'https://api.figma.com/v1';

interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  fills?: any[];
  strokes?: any[];
  strokeWeight?: number;
  cornerRadius?: number | number[];
  absoluteBoundingBox?: { x: number; y: number; width: number; height: number };
  relativeTransform?: number[][];
  constraints?: { horizontal: string; vertical: string };
  layoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  layoutAlign?: string;
  layoutGrow?: number;
  itemSpacing?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  primaryAxisSizingMode?: 'FIXED' | 'AUTO';
  counterAxisSizingMode?: 'FIXED' | 'AUTO';
  justifyContent?: string;
  alignItems?: string;
  style?: any;
  characters?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  textAutoResize?: string;
  textStyle?: any;
  opacity?: number;
  visible?: boolean;
}

interface DesignAnalysis {
  nodeId: string;
  name: string;
  type: string;
  dimensions: { width: number; height: number };
  position: { x: number; y: number };
  children: Array<{
    id: string;
    name: string;
    type: string;
    dimensions?: { width: number; height: number };
    styles?: any;
    layout?: any;
    text?: string;
  }>;
  layoutInfo?: any;
  styles: {
    colors: Array<{ name: string; hex: string }>;
    fonts: Array<{ family: string; sizes: number[] }>;
  };
}

function findNodeById(node: FigmaNode, targetId: string): FigmaNode | null {
  if (node.id === targetId) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeById(child, targetId);
      if (found) return found;
    }
  }
  return null;
}

function extractColorFromFill(fill: any): string | null {
  if (!fill || fill.type !== 'SOLID' || !fill.color) return null;
  const { r, g, b } = fill.color;
  const a = fill.opacity !== undefined ? fill.opacity : 1;
  const toHex = (v: number) => Math.round(v * 255).toString(16).padStart(2, '0');
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return a < 1 ? `${hex}${toHex(a)}` : hex;
}

function analyzeNode(node: FigmaNode): DesignAnalysis {
  const colors = new Map<string, string>();
  const fonts = new Map<string, Set<number>>();

  function collectStyles(n: FigmaNode) {
    // Collect colors
    if (n.fills) {
      for (const fill of n.fills) {
        const color = extractColorFromFill(fill);
        if (color && fill.styleId) {
          colors.set(fill.styleId, color);
        } else if (color) {
          colors.set(`local_${n.id}`, color);
        }
      }
    }
    
    // Collect fonts
    if (n.fontSize && n.fontFamily) {
      if (!fonts.has(n.fontFamily)) {
        fonts.set(n.fontFamily, new Set());
      }
      fonts.get(n.fontFamily)!.add(n.fontSize);
    }

    if (n.children) {
      n.children.forEach(collectStyles);
    }
  }

  collectStyles(node);

  const bbox = node.absoluteBoundingBox || { x: 0, y: 0, width: 0, height: 0 };

  return {
    nodeId: node.id,
    name: node.name,
    type: node.type,
    dimensions: { width: Math.round(bbox.width), height: Math.round(bbox.height) },
    position: { x: Math.round(bbox.x), y: Math.round(bbox.y) },
    children: (node.children || []).map(child => ({
      id: child.id,
      name: child.name,
      type: child.type,
      dimensions: child.absoluteBoundingBox 
        ? { 
            width: Math.round(child.absoluteBoundingBox.width), 
            height: Math.round(child.absoluteBoundingBox.height) 
          } 
        : undefined,
      styles: {
        fills: child.fills?.map((f: any) => ({
          type: f.type,
          color: extractColorFromFill(f),
          opacity: f.opacity,
        })).filter((c: any) => c.color),
        strokes: child.strokes?.map((s: any) => ({
          type: s.type,
          color: extractColorFromFill(s),
          weight: child.strokeWeight,
        })),
        cornerRadius: child.cornerRadius,
        opacity: child.opacity,
      },
      layout: {
        layoutMode: child.layoutMode,
        itemSpacing: child.itemSpacing,
        paddingLeft: child.paddingLeft,
        paddingRight: child.paddingRight,
        paddingTop: child.paddingTop,
        paddingBottom: child.paddingBottom,
        justifyContent: child.justifyContent,
        alignItems: child.alignItems,
        layoutGrow: child.layoutGrow,
        layoutAlign: child.layoutAlign,
        constraints: child.constraints,
      },
      text: child.characters || undefined,
      textStyle: child.fontSize 
        ? {
            family: child.fontFamily,
            size: child.fontSize,
            weight: child.fontWeight,
          }
        : undefined,
    })),
    layoutInfo: {
      layoutMode: node.layoutMode,
      itemSpacing: node.itemSpacing,
      padding: {
        left: node.paddingLeft,
        right: node.paddingRight,
        top: node.paddingTop,
        bottom: node.paddingBottom,
      },
      justifyContent: node.justifyContent,
      alignItems: node.alignItems,
      primaryAxisSizingMode: node.primaryAxisSizingMode,
      counterAxisSizingMode: node.counterAxisSizingMode,
    },
    styles: {
      colors: Array.from(colors.entries()).map(([id, hex]) => ({ 
        id, 
        hex,
        name: `color_${id.replace(/[:_]/g, '_')}` 
      })),
      fonts: Array.from(fonts.entries()).map(([family, sizes]) => ({
        family,
        sizes: Array.from(sizes).sort((a, b) => a - b),
      })),
    },
  };
}

async function fetchNode(fileKey: string, nodeId: string, token: string) {
  const res = await fetch(`${FIGMA_API_BASE}/files/${fileKey}/nodes?ids=${nodeId}&depth=3`, {
    headers: {
      'X-Figma-Token': token,
    },
  });

  if (!res.ok) {
    throw new Error(`Figma node fetch failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

async function main() {
  const fileKey = process.env.FIGMA_FILE_KEY;
  const token = process.env.FIGMA_PERSONAL_ACCESS_TOKEN;
  const targetNodeId = process.argv[2] || process.env.FIGMA_NODE_ID || '265:270';

  if (!fileKey || !token) {
    console.error('Missing FIGMA_FILE_KEY or FIGMA_PERSONAL_ACCESS_TOKEN');
    process.exit(1);
  }

  console.log(`Fetching node ${targetNodeId} from Figma file ${fileKey}...`);

  const nodeData: any = await fetchNode(fileKey, targetNodeId, token);
  
  if (!nodeData.nodes || !nodeData.nodes[targetNodeId]) {
    console.error(`Node ${targetNodeId} not found in file`);
    process.exit(1);
  }

  const node = nodeData.nodes[targetNodeId].document;
  const analysis = analyzeNode(node);

  // Save analysis
  const outputDir = path.resolve(process.cwd(), 'figma-analysis');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.resolve(outputDir, `node-${targetNodeId.replace(/[:\-]/g, '_')}-analysis.json`);
  fs.writeFileSync(outputPath, JSON.stringify(analysis, null, 2));

  console.log(`\n✓ Analysis saved to: ${outputPath}`);
  console.log(`\n📐 Frame: ${analysis.name} (${analysis.type})`);
  console.log(`   Dimensions: ${analysis.dimensions.width} × ${analysis.dimensions.height}px`);
  console.log(`   Position: (${analysis.position.x}, ${analysis.position.y})`);
  console.log(`\n🎨 Colors found: ${analysis.styles.colors.length}`);
  analysis.styles.colors.forEach(c => console.log(`   ${c.name}: ${c.hex}`));
  console.log(`\n📝 Fonts found: ${analysis.styles.fonts.length}`);
  analysis.styles.fonts.forEach(f => 
    console.log(`   ${f.family}: ${f.sizes.join(', ')}px`)
  );
  console.log(`\n📦 Children: ${analysis.children.length}`);
  
  if (analysis.layoutInfo.layoutMode) {
    console.log(`\n🔧 Layout: ${analysis.layoutInfo.layoutMode}`);
    console.log(`   Item spacing: ${analysis.layoutInfo.itemSpacing || 0}px`);
    console.log(`   Padding: ${analysis.layoutInfo.padding.top || 0}/${analysis.layoutInfo.padding.right || 0}/${analysis.layoutInfo.padding.bottom || 0}/${analysis.layoutInfo.padding.left || 0}`);
  }

  console.log('\n✅ Done! You can now use this analysis for coding.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
