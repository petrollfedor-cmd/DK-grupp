import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Радиусные элементы для колонн и фасадов — ДК ГРУПП',
  description: 'Радиусные элементы из алюминия, нержавеющей и оцинкованной стали для облицовки колонн и фасадов. Технология вальцовки АКП. Элементы любой сложности для спортивных и общественных зданий.',
  keywords: ['радиусные элементы', 'облицовка колонн', 'вальцовка', 'алюминиевые панели', 'нержавеющая сталь', 'фасадные элементы', 'ДК ГРУПП'],
  alternates: { canonical: '/types-works/radius-elements' },
  openGraph: {
    title: 'Радиусные элементы для колонн и фасадов — ДК ГРУПП',
    description: 'Гнутые элементы из алюминия и стали для облицовки колонн.',
    url: '/types-works/radius-elements',
  },
};

export default function RadiusElementsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
