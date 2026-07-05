import { NextResponse } from 'next/server';
import { readJSON } from '@/lib/content';

export async function GET() {
  try {
    const hero = readJSON<any>('hero.json') || {};
    return NextResponse.json({ success: true, data: hero });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to load hero' },
      { status: 500 }
    );
  }
}
