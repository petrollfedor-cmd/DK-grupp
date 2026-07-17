import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Противопожарные окна и витражи — ДК ГРУПП',
  description: 'Противопожарные алюминиевые витражи с пределом огнестойкости E, EI, EIW на 15-60 минут. Светопрозрачные перегородки, ограждения, фасады, зенитные фонари до EI9 90. Остеклённые противопожарные двери.',
  keywords: ['противопожарные окна', 'противопожарные витражи', 'огнестойкие конструкции', 'светопрозрачные перегородки', 'противопожарные двери', 'ДК ГРУПП'],
  alternates: { canonical: '/types-works/fire-windows' },
  openGraph: {
    title: 'Противопожарные окна и витражи — ДК ГРУПП',
    description: 'Огнестойкие витражи E, EI, EIW. Перегородки и двери до EI9 90.',
    url: '/types-works/fire-windows',
  },
};

export default function FireWindowsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
