import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Контакты — ДК ГРУПП',
  description: 'Свяжитесь с ДК ГРУПП: телефон +7 (911) 999-49-95, email info@dkfasad.ru. Офис в Самаре, пр. Карла Маркса, д. 192, оф. 713. Обсудите ваш проект и получите расчёт стоимости.',
  keywords: ['контакты', 'телефон', 'email', 'Самара', 'ДК ГРУПП', 'расчёт стоимости'],
  alternates: { canonical: '/contacts' },
  openGraph: {
    title: 'Контакты — ДК ГРУПП',
    description: 'Телефон, email, адрес офиса в Самаре. Обсудите ваш проект с менеджером.',
    url: '/contacts',
  },
};

export default function ContactsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
