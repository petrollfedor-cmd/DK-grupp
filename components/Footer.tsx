'use client';

import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import NextImage from 'next/image';

const { Footer } = Layout;

interface AppFooterProps {
  onOpenRequisites?: () => void;
}

export default function AppFooter({ onOpenRequisites }: AppFooterProps) {
  const [showPartners, setShowPartners] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 767);
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Footer
      style={{
        background: '#23365E',
        color: '#fff',
        padding: isMobile ? '24px 16px' : '40px 142px',
        minHeight: 'auto',
      }}
    >
      {isMobile ? (
        <div style={{ maxWidth: '1920px', margin: '0 auto' }}>
          {/* Верхний ряд: Логотип слева + Контакты справа */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <NextImage
                src="/figma/15:462.png"
                alt="Логотип"
                width={90}
                height={80}
                quality={80}
                style={{ width: '90px', height: '80px', objectFit: 'contain', marginBottom: '12px' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
            <div style={{ maxWidth: '50%' }}>
              <div style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>Контакты:</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <a href="tel:+79119994995" style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', color: '#fff', textDecoration: 'none' }}>+7 (911) 999-49-95</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 6l-10 7L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <a href="mailto:DK-Group1@yandex.ru" style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', color: '#fff', textDecoration: 'none' }}>DK-Group1@yandex.ru</a>
              </div>
            </div>
          </div>

          {/* Социальные сети */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', color: '#fff', marginBottom: '12px' }}>Социальные сети:</div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '48px', height: '48px', backgroundColor: '#0088cc', borderRadius: '14px', overflow: 'hidden' }}>
                <NextImage src="/figma/telegram_icon.png" alt="Telegram" width={32} height={32} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }} />
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '48px', height: '48px', backgroundColor: '#25D366', borderRadius: '14px', overflow: 'hidden' }}>
                <NextImage src="/figma/whatsapp_icon.png" alt="WhatsApp" width={32} height={32} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }} />
              </a>
            </div>
          </div>

          {/* Партнёры - раскрывающийся блок */}
          <div style={{ marginBottom: '16px' }}>
            <button
              onClick={() => setShowPartners(!showPartners)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '12px 16px',
                color: '#fff',
                fontFamily: 'Lato, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <span>Наши партнёры</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                style={{ transition: 'transform 0.3s ease', transform: showPartners ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {showPartners && (
              <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><NextImage src="/figma/370:119.png" alt="Express" width={110} height={70} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} /></div>
                <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><NextImage src="/figma/370:121.png" alt="Book Store" width={110} height={70} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} /></div>
                <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><NextImage src="/figma/370:122.png" alt="Color Lab" width={110} height={70} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} /></div>
                <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><NextImage src="/figma/370:123.png" alt="Glow" width={110} height={70} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} /></div>
                <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><NextImage src="/figma/370:124.png" alt="X-Trade" width={110} height={70} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} /></div>
                <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><NextImage src="/figma/370:125.png" alt="Touch" width={110} height={70} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} /></div>
              </div>
            )}
          </div>

          {/* Документы - раскрывающийся блок */}
          <div style={{ marginBottom: '16px' }}>
            <button
              onClick={() => setShowDocs(!showDocs)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '12px 16px',
                color: '#fff',
                fontFamily: 'Lato, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <span>Документы</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                style={{ transition: 'transform 0.3s ease', transform: showDocs ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {showDocs && (
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 18V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 15L12 12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <a href="/documents/certificates.pdf" style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', color: '#fff', textDecoration: 'none' }}>Скачать сертификаты</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 3H15V9H9V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 15V21H15V15H9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 9V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span onClick={() => window.open('/documents/СРО.pdf', '_blank')} style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', color: '#fff', textDecoration: 'none', cursor: 'pointer' }}>Ассоциация «СРО «СВС»</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5C15 6.10457 14.1046 7 13 7H11C9.89543 7 9 6.10457 9 5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span onClick={() => window.open('/documents/Опросный-лист.docx', '_blank')} style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', color: '#fff', textDecoration: 'none', cursor: 'pointer' }}>Опросный лист для расчета</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V17.1667C5 17.5986 5.16795 18.0097 5.47551 18.3173L9.76732 22.6091C10.0749 22.9167 10.486 23.0846 10.9178 23.0846H19C20.1046 23.0846 21 22.1892 21 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 8V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span onClick={onOpenRequisites} style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', color: '#fff', textDecoration: 'none', cursor: 'pointer' }}>Реквизиты ДК-Групп</span>
                </div>
              </div>
            )}
          </div>

          {/* Кнопка наверх */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              margin: '0 auto',
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
      ) : (
        <div style={{ maxWidth: '1920px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '40px', alignItems: 'start' }}>
              {/* 1. Логотип и соцсети */}
              <div>
                <div style={{ marginBottom: '24px' }}>
                  <NextImage
                    src="/figma/15:462.png"
                    alt="Логотип"
                    width={90}
                    height={80}
                    quality={80}
                    style={{ width: '90px', height: '80px', objectFit: 'contain' }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontFamily: 'Lato, sans-serif', fontSize: '18px', color: '#fff', marginBottom: '12px' }}>Социальные сети:</div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <a href="https://t.me" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '48px', height: '48px', backgroundColor: '#0088cc', borderRadius: '14px', overflow: 'hidden' }}>
                      <NextImage src="/figma/telegram_icon.png" alt="Telegram" width={32} height={32} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }} />
                    </a>
                    <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '48px', height: '48px', backgroundColor: '#25D366', borderRadius: '14px', overflow: 'hidden' }}>
                      <NextImage src="/figma/whatsapp_icon.png" alt="WhatsApp" width={32} height={32} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }} />
                    </a>
                  </div>
                </div>
              </div>

              {/* 2. Партнёры */}
              <div>
                <div style={{ fontFamily: 'Lato, sans-serif', fontSize: '18px', fontWeight: 600, color: '#fff', marginBottom: '16px' }}>Наши партнёры:</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', justifyContent: 'center', maxWidth: '346px' }}>
                  <div style={{ width: '110px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><NextImage src="/figma/370:119.png" alt="Express" width={110} height={70} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
                  <div style={{ width: '110px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><NextImage src="/figma/370:121.png" alt="Book Store" width={110} height={70} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
                  <div style={{ width: '110px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><NextImage src="/figma/370:122.png" alt="Color Lab" width={110} height={70} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
                  <div style={{ width: '110px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><NextImage src="/figma/370:123.png" alt="Glow" width={110} height={70} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
                  <div style={{ width: '110px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><NextImage src="/figma/370:124.png" alt="X-Trade" width={110} height={70} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
                  <div style={{ width: '110px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><NextImage src="/figma/370:125.png" alt="Touch" width={110} height={70} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
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
                  <span
                    onClick={() => window.open('/documents/СРО.pdf', '_blank')}
                    style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', color: '#fff', textDecoration: 'none', cursor: 'pointer', transition: 'opacity 0.2s' }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    Ассоциация «СРО «СВС»
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5C15 6.10457 14.1046 7 13 7H11C9.89543 7 9 6.10457 9 5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span
                    onClick={() => window.open('/documents/Опросный-лист.docx', '_blank')}
                    style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', color: '#fff', textDecoration: 'none', cursor: 'pointer', transition: 'opacity 0.2s' }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    Опросный лист для расчета
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V17.1667C5 17.5986 5.16795 18.0097 5.47551 18.3173L9.76732 22.6091C10.0749 22.9167 10.486 23.0846 10.9178 23.0846H19C20.1046 23.0846 21 22.1892 21 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 8V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span
                    onClick={onOpenRequisites}
                    style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', color: '#fff', textDecoration: 'none', cursor: 'pointer', transition: 'opacity 0.2s' }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    Реквизиты ДК-Групп
                  </span>
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
      )}
    </Footer>
  );
}
