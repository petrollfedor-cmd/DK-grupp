import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Стеклянные перегородки и продукция технопарков — ДК ГРУПП',
  description: 'Алюминиевые сотовые панели ALUDECORE, Smart-стекло, триплекс с сеткой, декоративный триплекс, обогреваемое стекло. Продукция ведущих российских технопарков для фасадов и интерьеров.',
  keywords: ['стеклянные перегородки', 'ALUDECORE', 'smart-стекло', 'триплекс', 'сотовые панели', 'Private Glass', 'ДК ГРУПП'],
  alternates: { canonical: '/types-works/glass-partitions' },
  openGraph: {
    title: 'Стеклянные перегородки и продукция технопарков — ДК ГРУПП',
    description: 'ALUDECORE, Smart-стекло, триплекс. Инновационные материалы для фасадов и интерьеров.',
    url: '/types-works/glass-partitions',
  },
};

export default function GlassPartitionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
