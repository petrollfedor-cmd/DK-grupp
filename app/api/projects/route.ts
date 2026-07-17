import { NextResponse } from 'next/server';

const GITHUB_REPO = process.env.GITHUB_REPO || 'petrollfedor-cmd/DK-grupp';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

/**
 * Читает JSON напрямую из GitHub (raw).
 * Сайт обновляется мгновенно после коммита — без ребилда Vercel.
 */
async function readFromGitHub(filename: string): Promise<any | null> {
  const url = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/data/${filename}`;
  try {
    const res = await fetch(url, { cache: 'no-store', next: { revalidate: 0 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch from GitHub:', filename, err);
    return null;
  }
}

export async function GET() {
  const projects = await readFromGitHub('projects.json');
  if (projects) {
    return NextResponse.json({ success: true, data: projects });
  }
  return NextResponse.json(
    { success: false, error: 'Failed to load projects' },
    { status: 500 }
  );
}
