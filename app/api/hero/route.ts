import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

async function readHeroLocal(): Promise<any | null> {
  const filepath = path.join(process.cwd(), 'data', 'hero.json');
  try {
    const data = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to read hero.json locally:', err);
    return null;
  }
}

export async function GET() {
  const hero = await readHeroLocal();
  if (hero) {
    return NextResponse.json({ success: true, data: hero });
  }
  return NextResponse.json(
    { success: false, error: 'Failed to load hero' },
    { status: 500 }
  );
}
