import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'О компании — ДК ГРУПП',
  description: 'ДК ГРУПП — строительная компания, генеральный подрядчик и проектировщик. Полный цикл работ: проектирование, производство, монтаж и сервис. Работаем по всей России.',
  keywords: ['о компании', 'ДК ГРУПП', 'генеральный подрядчик', 'проектировщик', 'строительная компания'],
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'О компании — ДК ГРУПП',
    description: 'Строительная компания полного цикла. Генеральный подрядчик и проектировщик.',
    url: '/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
