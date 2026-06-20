'use client';

import Link from 'next/link';
import Contacts from '@/components/Contacts';

export default function ContactsPage() {
  return (
    <main>
      {/* Хлебные крошки */}
      <div style={{ padding: '12px 24px', background: '#f5f7fb', height: '44px', display: 'flex', alignItems: 'center' }}>
        <Link
          href="/"
          style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '14px',
            color: '#23365E',
            textDecoration: 'none',
          }}
        >
          Главная
        </Link>
        <span style={{ color: '#23365E', opacity: 0.5, margin: '0 8px' }}>/</span>
        <span style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '14px',
          color: '#23365E',
        }}>
          Контакты
        </span>
      </div>

      <Contacts />
    </main>
  );
}
