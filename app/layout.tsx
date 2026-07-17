import type { Metadata } from 'next';
import 'antd/dist/reset.css';
import './globals.css';
import ClientLayout from './client-layout';

const SITE_URL = 'https://dk-grupp.ru';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ДК ГРУПП — строительная компания полного цикла | Фасады, остекление, конструкции',
    template: '%s | ДК ГРУПП',
  },
  description: 'ДК ГРУПП — генеральный подрядчик и проектировщик. Строительно-монтажные работы, фасадное остекление, светопрозрачные конструкции, противопожарные системы. Проектирование, поставка, монтаж под ключ.',
  keywords: [
    'строительная компания',
    'фасадное остекление',
    'вентилируемые фасады',
    'светопрозрачные конструкции',
    'противопожарные витражи',
    'стеклянные перегородки',
    'остекление лифтовых шахт',
    'стеклянные ограждения',
    'генеральный подрядчик',
    'проектирование фасадов',
    'ДК ГРУПП',
    'строительно-монтажные работы',
  ],
  authors: [{ name: 'ДК ГРУПП' }],
  creator: 'ДК ГРУПП',
  publisher: 'ДК ГРУПП',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: SITE_URL,
    siteName: 'ДК ГРУПП',
    title: 'ДК ГРУПП — строительная компания полного цикла',
    description: 'Строительно-монтажные работы, фасадное остекление, светопрозрачные конструкции. Проектирование, поставка, монтаж под ключ.',
    images: [
      {
        url: '/figma/265:278.png',
        width: 1200,
        height: 630,
        alt: 'ДК ГРУПП — строительная компания',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ДК ГРУПП — строительная компания полного цикла',
    description: 'Фасады, остекление, светопрозрачные конструкции. Проектирование и монтаж под ключ.',
    images: ['/figma/265:278.png'],
  },
  icons: {
    icon: '/favicon.png',
  },
  category: 'business',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
