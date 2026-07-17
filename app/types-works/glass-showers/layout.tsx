import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Стеклянные душевые кабины на заказ — ДК ГРУПП',
  description: 'Душевые кабины и перегородки на заказ: распашные, откатные, хамелеон (затемняющееся стекло), угловые конфигурации. Для жилых и коммерческих объектов: бани, спорткомплексы, офисы.',
  keywords: ['стеклянные душевые', 'душевые кабины на заказ', 'распашные двери', 'откатные двери', 'хамелеон стекло', 'душевые перегородки', 'ДК ГРУПП'],
  alternates: { canonical: '/types-works/glass-showers' },
  openGraph: {
    title: 'Стеклянные душевые кабины на заказ — ДК ГРУПП',
    description: 'Распашные, откатные, хамелеон, угловые. Для домов, бань, спорткомплексов.',
    url: '/types-works/glass-showers',
  },
};

export default function GlassShowersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
