import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Сертификаты и документы — ДК ГРУПП',
  description: 'Сертификаты, допуски СРО, ISO, пожарная безопасность. Все необходимые документы для выполнения строительных работ любой сложности.',
  keywords: ['сертификаты', 'допуски СРО', 'ISO', 'пожарная безопасность', 'документы', 'ДК ГРУПП'],
  alternates: { canonical: '/certificates' },
  openGraph: {
    title: 'Сертификаты и документы — ДК ГРУПП',
    description: 'Все необходимые сертификаты и допуски для строительных работ.',
    url: '/certificates',
  },
};

export default function CertificatesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
