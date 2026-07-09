import { NextResponse } from 'next/server';
import { getCertificates } from '@/lib/content';

export async function GET() {
  try {
    const certificates = getCertificates();
    return NextResponse.json({ success: true, data: certificates });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to load certificates' },
      { status: 500 }
    );
  }
}