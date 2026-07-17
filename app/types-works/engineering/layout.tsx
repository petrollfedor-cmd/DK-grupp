import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Инженерная документация и проектирование — ДК ГРУПП',
  description: 'Разработка инженерной документации, проектов производства работ, удалённый отдел ПТО. Более 850 успешных проектов. 32 специалиста. Широкая география по всей России.',
  keywords: ['инженерная документация', 'проектирование', 'ПТО', 'проект производства работ', 'управление проектами', 'ДК ГРУПП'],
  alternates: { canonical: '/types-works/engineering' },
  openGraph: {
    title: 'Инженерная документация и проектирование — ДК ГРУПП',
    description: 'Разработка документации, удалённый ПТО. 850+ проектов, 32 специалиста.',
    url: '/types-works/engineering',
  },
};

export default function EngineeringLayout({ children }: { children: React.ReactNode }) {
  return children;
}
