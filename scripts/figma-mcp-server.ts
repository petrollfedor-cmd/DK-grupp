#!/usr/bin/env node
/**
 * Figma MCP Server
 * Предоставляет доступ к данным Figma через MCP протокол
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Загружаем последний анализ
function loadAnalysis(nodeId?: string) {
  const analysisDir = resolve(__dirname, '../figma-analysis');
  
  if (nodeId) {
    const safeNodeId = nodeId.replace(/[:\-]/g, '_');
    const filePath = resolve(analysisDir, `node-${safeNodeId}-analysis.json`);
    if (existsSync(filePath)) {
      return JSON.parse(readFileSync(filePath, 'utf-8'));
    }
  }
  
  // Ищем последний файл анализа
  const files = existsSync(analysisDir) 
    ? readFileSync(analysisDir, { withFileTypes: true })
        .filter(d => d.isFile() && d.name.endsWith('.json'))
        .sort((a, b) => b.name.localeCompare(a.name))
    : [];
  
  if (files.length > 0) {
    const filePath = resolve(analysisDir, files[0].name);
    return JSON.parse(readFileSync(filePath, 'utf-8'));
  }
  
  return null;
}

// Загружаем все изображения Figma
function loadFigmaImages() {
  const publicDir = resolve(__dirname, '../public/figma');
  if (!existsSync(publicDir)) return [];
  
  const files = readFileSync(publicDir, { withFileTypes: true })
    .filter(d => d.isFile() && d.name.endsWith('.png'))
    .map(d => ({
      id: d.name.replace('.png', ''),
      path: `/figma/${d.name}`,
      name: d.name,
    }));
  
  return files;
}

const server = new Server(
  {
    name: 'figma-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_figma_analysis',
        description: 'Получить анализ макета Figma для указанного node ID или последнего сохраненного',
        inputSchema: {
          type: 'object',
          properties: {
            nodeId: {
              type: 'string',
              description: 'Figma node ID (например, "265:270")',
            },
          },
        },
      },
      {
        name: 'get_figma_colors',
        description: 'Получить все цвета из макета Figma',
        inputSchema: {
          type: 'object',
          properties: {
            nodeId: {
              type: 'string',
              description: 'Figma node ID (опционально)',
            },
          },
        },
      },
      {
        name: 'get_figma_children',
        description: 'Получить список дочерних элементов макета с их параметрами',
        inputSchema: {
          type: 'object',
          properties: {
            nodeId: {
              type: 'string',
              description: 'Figma node ID (опционально)',
            },
            filterByType: {
              type: 'string',
              description: 'Фильтр по типу элемента (TEXT, RECTANGLE, FRAME и т.д.)',
            },
          },
        },
      },
      {
        name: 'get_figma_images',
        description: 'Получить список всех загруженных изображений из Figma',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'search_figma_text',
        description: 'Найти текстовые элементы в макете по ключевому слову',
        inputSchema: {
          type: 'object',
          properties: {
            searchText: {
              type: 'string',
              description: 'Текст для поиска',
            },
            nodeId: {
              type: 'string',
              description: 'Figma node ID (опционально)',
            },
          },
          required: ['searchText'],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'get_figma_analysis') {
    const nodeId = args?.nodeId as string | undefined;
    const analysis = loadAnalysis(nodeId);
    
    if (!analysis) {
      return {
        content: [
          {
            type: 'text',
            text: 'Анализ не найден. Запустите сначала `npm run figma-analyze`',
          },
        ],
      };
    }
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(analysis, null, 2),
        },
      ],
    };
  }

  if (name === 'get_figma_colors') {
    const nodeId = args?.nodeId as string | undefined;
    const analysis = loadAnalysis(nodeId);
    
    if (!analysis) {
      return {
        content: [
          {
            type: 'text',
            text: 'Анализ не найден. Запустите сначала `npm run figma-analyze`',
          },
        ],
      };
    }
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(analysis.styles.colors, null, 2),
        },
      ],
    };
  }

  if (name === 'get_figma_children') {
    const nodeId = args?.nodeId as string | undefined;
    const filterByType = args?.filterByType as string | undefined;
    const analysis = loadAnalysis(nodeId);
    
    if (!analysis) {
      return {
        content: [
          {
            type: 'text',
            text: 'Анализ не найден. Запустите сначала `npm run figma-analyze`',
          },
        ],
      };
    }
    
    let children = analysis.children || [];
    if (filterByType) {
      children = children.filter((c: any) => c.type === filterByType);
    }
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(children, null, 2),
        },
      ],
    };
  }

  if (name === 'get_figma_images') {
    const images = loadFigmaImages();
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(images, null, 2),
        },
      ],
    };
  }

  if (name === 'search_figma_text') {
    const searchText = args?.searchText as string;
    const nodeId = args?.nodeId as string | undefined;
    const analysis = loadAnalysis(nodeId);
    
    if (!analysis) {
      return {
        content: [
          {
            type: 'text',
            text: 'Анализ не найден. Запустите сначала `npm run figma-analyze`',
          },
        ],
      };
    }
    
    const results = (analysis.children || []).filter((c: any) => 
      c.text && c.text.toLowerCase().includes(searchText.toLowerCase())
    );
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(results, null, 2),
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Figma MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
