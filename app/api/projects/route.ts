import { NextResponse } from 'next/server';
import { readJSON } from '@/lib/content';

export async function GET() {
  try {
    const projects = readJSON<any[]>('projects.json') || [];
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to load projects' },
      { status: 500 }
    );
  }
}
