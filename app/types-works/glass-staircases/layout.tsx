import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Стеклянные лестничные ограждения — ДК ГРУПП',
  description: 'Ограждения на точках, алюминиевом профиле и министойках. Закалённое триплексное стекло 10-16 мм. Поручни из дерева или нержавеющей стали. Высота 950-1200 мм.',
  keywords: ['стеклянные ограждения', 'лестничные ограждения', 'триплексное стекло', 'ограждения на точках', 'алюминиевый профиль', 'министойки', 'ДК ГРУПП'],
  alternates: { canonical: '/types-works/glass-staircases' },
  openGraph: {
    title: 'Стеклянные лестничные ограждения — ДК ГРУПП',
    description: 'Ограждения на точках, профиле и министойках. Закалённое стекло, поручни из дерева и стали.',
    url: '/types-works/glass-staircases',
  },
};

export default function GlassStaircasesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
