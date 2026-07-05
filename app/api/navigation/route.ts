import { NextResponse } from 'next/server';
import { readJSON } from '@/lib/content';

export async function GET() {
  try {
    const navigation = readJSON<any[]>('navigation.json') || [];
    return NextResponse.json({ success: true, data: navigation });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to load navigation' },
      { status: 500 }
    );
  }
}
