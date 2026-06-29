import type { Metadata } from 'next';
import 'antd/dist/reset.css';
import './globals.css';
import ClientLayout from './client-layout';

export const metadata: Metadata = {
  title: 'ООО ДК ГРУПП | Строительство и ремонт',
  description: 'Специализированная строительная компания полного цикла. Строительство, ремонт, отделка и дизайн объектов.',
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: '/favicon.png',
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
