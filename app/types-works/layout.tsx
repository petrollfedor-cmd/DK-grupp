import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Типы работ — ДК ГРУПП',
  description: 'Проектирование фасадов, стеклянные перегородки, лестничные ограждения, остекление лифтовых шахт, противопожарные витражи, радиусные элементы, стеклянные душевые, инженерная документация.',
  keywords: ['типы работ', 'фасады', 'остекление', 'перегородки', 'ограждения', 'противопожарные конструкции', 'ДК ГРУПП'],
  alternates: { canonical: '/types-works' },
  openGraph: {
    title: 'Типы работ — ДК ГРУПП',
    description: 'Полный спектр строительных работ: фасады, остекление, конструкции.',
    url: '/types-works',
  },
};

export default function TypesWorksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
