'use client';

import { Layout } from 'antd';

const { Footer } = Layout;

export default function AppFooter() {
  return (
    <Footer
      style={{
        background: '#23365E',
        color: '#fff',
        padding: '40px 142px',
        minHeight: 'auto',
      }}
    >
      <div style={{ maxWidth: '1920px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '40px', alignItems: 'start' }}>
          {/* 1. Логотип и соцсети */}
          <div>
            <div style={{ marginBottom: '24px' }}>
              <img
                src="/figma/15:462.png"
                alt="Логотип"
                style={{ width: '90px', height: '80px', objectFit: 'contain' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontFamily: 'Lato, sans-serif', fontSize: '18px', color: '#fff', marginBottom: '12px' }}>Социальные сети:</div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href="https://t.me" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '48px', height: '48px', backgroundColor: '#0088cc', borderRadius: '14px', overflow: 'hidden' }}>
                  <img src="/figma/telegram_icon.png" alt="Telegram" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }} />
                </a>
                <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '48px', height: '48px', backgroundColor: '#25D366', borderRadius: '14px', overflow: 'hidden' }}>
                  <img src="/figma/whatsapp_icon.png" alt="WhatsApp" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }} />
                </a>
              </div>
            </div>
          </div>

          {/* 2. Партнёры */}
          <div>
            <div style={{ fontFamily: 'Lato, sans-serif', fontSize: '18px', fontWeight: 600, color: '#fff', marginBottom: '16px' }}>Наши партнёры:</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', justifyContent: 'center', maxWidth: '346px' }}>
              <div style={{ width: '110px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/figma/370:119.png" alt="Express" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
              <div style={{ width: '110px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/figma/370:121.png" alt="Book Store" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
              <div style={{ width: '110px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/figma/370:122.png" alt="Color Lab" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
              <div style={{ width: '110px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/figma/370:123.png" alt="Glow" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
              <div style={{ width: '110px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/figma/370:124.png" alt="X-Trade" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
              <div style={{ width: '110px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/figma/370:125.png" alt="Touch" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
            </div>
          </div>

          {/* 3. Документы */}
          <div>
            <div style={{ fontFamily: 'Lato, sans-serif', fontSize: '18px', fontWeight: 600, color: '#fff', marginBottom: '16px' }}>Документы:</div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 18V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 15L12 12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <a href="/documents/certificates.pdf" style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', color: '#fff', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')} onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}>Скачать сертификаты</a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 3H15V9H9V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 15V21H15V15H9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 9V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <a href="/documents/typical-details.pdf" style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', color: '#fff', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')} onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}>Типовые узлы</a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5C15 6.10457 14.1046 7 13 7H11C9.89543 7 9 6.10457 9 5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <a href="/documents/questionnaire.pdf" style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', color: '#fff', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')} onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}>Опросный лист для расчета</a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V17.1667C5 17.5986 5.16795 18.0097 5.47551 18.3173L9.76732 22.6091C10.0749 22.9167 10.486 23.0846 10.9178 23.0846H19C20.1046 23.0846 21 22.1892 21 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 8V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <a href="/documents/requisites.pdf" style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', color: '#fff', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')} onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}>Реквизиты ДК-Групп</a>
            </div>
          </div>

          {/* 4. Контакты */}
          <div>
            <div style={{ fontFamily: 'Lato, sans-serif', fontSize: '18px', fontWeight: 600, color: '#fff', marginBottom: '16px' }}>Контакты:</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <a href="tel:+79119994995" style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', color: '#fff', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')} onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}>+7 (911) 999-49-95</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 6l-10 7L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <a href="mailto:DK-Group1@yandex.ru" style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', color: '#fff', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')} onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}>DK-Group1@yandex.ru</a>
            </div>
          </div>
        </div>
        </div>

        {/* Кнопка наверх */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            marginLeft: '40px',
            flexShrink: 0,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </Footer>
  );
}
