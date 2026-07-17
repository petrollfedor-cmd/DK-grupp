import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Остекление лифтовых шахт — ДК ГРУПП',
  description: 'Панорамные лифты и остекление лифтовых шахт. Безрамные, с видимым каркасом, самонесущие системы. Закалённое стекло и триплекс. Соответствие ГОСТ 12506-81.',
  keywords: ['остекление лифтовых шахт', 'панорамные лифты', 'безрамное остекление', 'самонесущие системы', 'ГОСТ 12506-81', 'ДК ГРУПП'],
  alternates: { canonical: '/types-works/elevator-shafts' },
  openGraph: {
    title: 'Остекление лифтовых шахт — ДК ГРУПП',
    description: 'Панорамные лифты: безрамные, с каркасом, самонесущие. Закалённое стекло и триплекс.',
    url: '/types-works/elevator-shafts',
  },
};

export default function ElevatorShaftsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
