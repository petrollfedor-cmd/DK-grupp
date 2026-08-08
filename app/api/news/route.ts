import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'news.json');
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';

async function readNews(): Promise<any[]> {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeNews(news: any[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(news, null, 2), 'utf-8');
}

export async function GET() {
  const news = await readNews();
  return NextResponse.json({ success: true, data: news });
}

export async function POST(request: Request) {
  // Проверяем токен бота
  const auth = request.headers.get('authorization');
  if (auth !== `Bearer ${TELEGRAM_BOT_TOKEN}`) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { title, description, images, tag } = body;

    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: 'Missing title or description' },
        { status: 400 }
      );
    }

    const news = await readNews();
    const newItem = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      title,
      description,
      images: images || [],
      tag: tag || 'Новости',
    };

    news.unshift(newItem); // Добавляем в начало
    await writeNews(news);

    return NextResponse.json({ success: true, data: newItem });
  } catch (err) {
    console.error('Failed to add news:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to save news' },
      { status: 500 }
    );
  }
}
