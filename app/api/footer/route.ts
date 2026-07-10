import { NextResponse } from 'next/server';

const GITHUB_REPO = process.env.GITHUB_REPO || 'petrollfedor-cmd/DK-grupp';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

async function readFromGitHub(filename: string): Promise<any | null> {
  const url = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/data/${filename}`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch from GitHub:', filename, err);
    return null;
  }
}

export async function GET() {
  const footer = await readFromGitHub('footer.json');
  if (footer) {
    return NextResponse.json({ success: true, data: footer });
  }
  return NextResponse.json(
    { success: false, error: 'Failed to load footer' },
    { status: 500 }
  );
}
