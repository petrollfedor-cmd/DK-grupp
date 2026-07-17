'use client';

import { Typography } from 'antd';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

interface HeroProps {
  imageUrl?: string;
  title: string;
}

export default function Hero({ imageUrl, title }: HeroProps) {
  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        height: '550px',
        background: `url('${imageUrl || '/placeholder-hero.jpg'}') center/cover`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        overflow: 'visible',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5))' }} />
      
      {/* Логотип и контакты */}
      <div className="logo-contacts-overlay hero-logo-contacts" style={{ position: 'absolute', top: '0', left: '0', right: '0', height: '60px', display: 'flex', alignItems: 'center', zIndex: 99, padding: '0 142px' }}>
        <div style={{ position: 'absolute', left: '188px', top: '0' }}>
          <Link href="/" className="logo-link hero-logo-contacts-delay">
            <img src="/figma/2:5.png" alt="Логотип ДК ГРУПП — строительная компания" className="logo-img" />
          </Link>
        </div>
        <div className="contacts-col hero-logo-contacts-delay" style={{ display: 'flex', gap: '48px', marginLeft: 'auto' }}>
          <a href="mailto:DK-Group1@yandex.ru" className="contact-email">DK-Group1@yandex.ru</a>
          <a href="tel:+79119994995" className="contact-phone">+7 (911) 999-49-95</a>
        </div>
      </div>

      <div
        className="hero-description-box"
        style={{
          position: 'absolute',
          top: '50%',
          left: '192px',
          transform: 'translateY(-50%)',
          padding: '24px',
          borderRadius: '5px',
          background: 'linear-gradient(97.13deg, rgba(218, 229, 239, 0.2) 47.02%, rgba(68, 89, 132, 0.2) 78.23%, rgba(18, 19, 33, 0.2) 98.57%)',
          border: '1px solid rgba(255, 255, 255, 0.39)',
          zIndex: 10,
          maxWidth: '700px',
          minWidth: '400px',
          maxHeight: '400px',
          overflowY: 'auto',
          whiteSpace: 'normal',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        {title && (
          <p
            style={{
              color: '#fff',
              margin: 0,
              fontFamily: 'Lato',
              fontWeight: 600,
              fontSize: 'clamp(16px, 2vw, 22px)',
              lineHeight: '1.4',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              textAlign: 'left',
            }}
          >
            {title}
          </p>
        )}
      </div>

      {/* Мобильная версия hero */}
      <div className="hero-mobile-content" style={{
        position: 'absolute',
        top: '50%',
        left: '16px',
        right: '16px',
        transform: 'translateY(-50%)',
        zIndex: 10,
        display: 'none',
      }}>
        <div style={{
          padding: '16px',
          borderRadius: '8px',
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.3)',
        }}>
          {title && (
            <p style={{
              color: '#fff',
              margin: 0,
              fontFamily: 'Lato',
              fontWeight: 600,
              fontSize: '18px',
              lineHeight: '1.3',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}>
              {title}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
