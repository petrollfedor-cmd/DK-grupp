import { NextResponse } from 'next/server';
import { readJSON } from '@/lib/content';

export async function GET() {
  try {
    const footer = readJSON<any>('footer.json') || {};
    return NextResponse.json({ success: true, data: footer });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to load footer' },
      { status: 500 }
    );
  }
}
