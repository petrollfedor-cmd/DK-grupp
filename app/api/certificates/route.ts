import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

async function readLocal(filename: string): Promise<any | null> {
  const filepath = path.join(process.cwd(), 'data', filename);
  try {
    const data = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to read locally:', err);
    return null;
  }
}

export async function GET() {
  const certificates = await readLocal('certificates.json');
  if (certificates) {
    return NextResponse.json({ success: true, data: certificates });
  }
  return NextResponse.json(
    { success: false, error: 'Failed to load certificates' },
    { status: 500 }
  );
}
