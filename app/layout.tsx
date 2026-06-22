import type { Metadata } from 'next';
import 'antd/dist/reset.css';
import './globals.css';
import ClientLayout from './client-layout';

export const metadata: Metadata = {
  title: {
    default: 'ООО ДК ГРУПП | Переговорные и офисные перегородки',
    template: '%s | ООО ДК ГРУПП',
  },
  description: 'Специализированная строительная компания полного цикла. Строительство, ремонт, отделка и дизайн объектов. Переговорные, офисные, стеклянные перегородки, лестничные ограждения.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'ООО ДК ГРУПП',
    images: [
      {
        url: '/figma/15:462.png',
        width: 1200,
        height: 630,
        alt: 'ООО ДК ГРУПП',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ООО ДК ГРУПП | Переговорные и офисные перегородки',
    description: 'Специализированная строительная компания полного цикла.',
  },
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
