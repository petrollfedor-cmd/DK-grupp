'use client';

import { Typography, Row, Col } from 'antd';
import { useState, useEffect } from 'react';

const { Title, Paragraph } = Typography;

const images1 = [
  '/figma/12:26.png',
  '/figma/251:99.png',
  '/figma/251:102.png',
  '/figma/tochki1.jpg',
];

const images2 = [
  '/figma/432:307.png',
  '/figma/255:5.png',
  '/figma/vprifile3.jpg',
  '/figma/vprofile1.jpg',
  '/figma/vprofile2.jpeg',
];

const images3 = [
  '/figma/432:322.png',
  '/figma/stoiki1.jpg',
  '/figma/stoiki2.jpg',
  '/figma/stoiki3.png',
];

function Carousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    images.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  const handleNext = () => {
    setCurrent((prev) => (prev + 2) % images.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 2 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 2) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const visible = [
    images[current],
    images[(current + 1) % images.length]
  ];

  return (
    <div className="gs-carousel" style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      marginBottom: '40px',
    }}>
      <div className="gs-carousel-nav" style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#23365E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '20px',
        cursor: 'pointer',
        flexShrink: 0,
      }} onClick={handlePrev}>
        ←
      </div>

      <div className="gs-carousel-photos" style={{
        display: 'flex',
        gap: '20px',
        maxWidth: '1000px',
      }}>
        {/* Левое фото */}
        <div style={{
          flex: 1,
          aspectRatio: '4/3',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        }}>
          <img
            src={visible[0]}
            alt={`Фото 1`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'opacity 0.3s ease',
            }}
            loading="lazy"
          />
        </div>
        {/* Правое фото */}
        <div style={{
          flex: 1,
          aspectRatio: '4/3',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        }}>
          <img
            src={visible[1]}
            alt={`Фото 2`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'opacity 0.3s ease',
            }}
            loading="lazy"
          />
        </div>
      </div>

      <div className="gs-carousel-nav" style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#23365E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '20px',
        cursor: 'pointer',
        flexShrink: 0,
      }} onClick={handleNext}>
        →
      </div>
    </div>
  );
}

export default function GlassStaircasesPage() {
  return (
    <main className="gs-main" style={{ padding: '40px 142px', maxWidth: '1200px', margin: '0 auto' }}>
      <style>{`
        @media (max-width: 768px) {
          .gs-main {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .gs-carousel {
            flex-direction: column !important;
            gap: 12px !important;
          }
          .gs-carousel-nav {
            width: 32px !important;
            height: 32px !important;
            font-size: 16px !important;
          }
          .gs-carousel-photos {
            flex-direction: column !important;
            gap: 12px !important;
          }
        }
      `}</style>
      {/* Хлебные крошки */}
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <a
          href="/"
          style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '16px',
            color: '#23365E',
            textDecoration: 'none',
          }}
        >
          Главная
        </a>
        <span style={{ color: '#23365E', opacity: 0.5 }}>/</span>
        <a
          href="/types-works"
          style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '16px',
            color: '#23365E',
            textDecoration: 'none',
          }}
        >
          Типы работ
        </a>
        <span style={{ color: '#23365E', opacity: 0.5 }}>/</span>
        <span style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '16px',
          color: '#23365E',
          opacity: 0.6,
        }}>
          Стеклянные лестничные ограждения
        </span>
      </div>

      {/* Заголовок */}
      <h2 style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '28px',
        fontWeight: 600,
        color: '#23365E',
        marginBottom: '48px',
      }}>
        Стеклянные лестничные ограждения:
      </h2>

      {/* Секция 1: Ограждение на точках */}
      <div style={{ marginBottom: '64px' }}>
        <Title level={3} style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '24px',
          fontWeight: 600,
          color: '#23365E',
          marginBottom: '16px',
        }}>
          Ограждение на точках для лестниц
        </Title>
        <Paragraph style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '16px',
          lineHeight: '1.8',
          color: '#444',
          marginBottom: '32px',
        }}>
          Наши ограждения на точках для лестниц — это современное и безопасное решение для вашего интерьера. Изготавливаются из закалённого триплексного стекла толщиной 10/12 мм, что обеспечивает отличную прочность и долговечность. Высота ограждения составляет 1200 мм, что соответствует стандартам безопасности и обеспечивает надежную защиту.
        </Paragraph>
        <Paragraph style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '16px',
          lineHeight: '1.8',
          color: '#444',
          marginBottom: '32px',
        }}>
          Крепеж осуществляется с помощью торцевых точечных держателей, что придает ограждению легкий и элегантный вид. В качестве поручня вы можете выбрать между натуральным деревом и нержавеющей сталью, что позволяет легко интегрировать ограждения в любой интерьер.
        </Paragraph>
        <Carousel images={images1} />
      </div>

      <div style={{
        borderTop: '1px solid #e0e0e0',
        borderBottom: '1px solid #e0e0e0',
        margin: '48px 0',
      }} />

      {/* Секция 2: Ограждения на алюминиевом профиле */}
      <div style={{ marginBottom: '64px' }}>
        <Title level={3} style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '24px',
          fontWeight: 600,
          color: '#23365E',
          marginBottom: '16px',
        }}>
          Ограждения на Алюминиевом Профиле
        </Title>
        <Paragraph style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '16px',
          lineHeight: '1.8',
          color: '#444',
          marginBottom: '32px',
        }}>
          Наши ограждения на алюминиевом профиле предлагают стильное и надежное решение для лестниц. Изготавливаются из закалённого или триплексного стекла толщиной 12/16 мм, что обеспечивает высокую прочность и безопасность. Высота ограждения составляет 1200 мм, что соответствует стандартам безопасности.
        </Paragraph>
        <Paragraph style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '16px',
          lineHeight: '1.8',
          color: '#444',
          marginBottom: '32px',
        }}>
          Крепеж осуществляется сверху на прочный алюминиевый профиль, что придает ограждению современный и минималистичный вид. В качестве поручня можно выбрать между натуральным деревом и нержавеющей сталью, что позволяет создать гармоничное сочетание с любым интерьером.
        </Paragraph>
        <Carousel images={images2} />
      </div>

      <div style={{
        borderTop: '1px solid #e0e0e0',
        borderBottom: '1px solid #e0e0e0',
        margin: '48px 0',
      }} />

      {/* Секция 3: Ограждение на министойках */}
      <div>
        <Title level={3} style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '24px',
          fontWeight: 600,
          color: '#23365E',
          marginBottom: '16px',
        }}>
          Ограждение на министойках
        </Title>
        <Paragraph style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '16px',
          lineHeight: '1.8',
          color: '#444',
          marginBottom: '32px',
        }}>
          Наши ограждения на министойках — это элегантное и функциональное решение для лестниц. Изготавливаются из закалённого прозрачного стекла толщиной 10/12 мм, что гарантирует прочность и долговечность. Высота ограждения составляет 950 мм, что обеспечивает безопасное и стильное оформление.
        </Paragraph>
        <Paragraph style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '16px',
          lineHeight: '1.8',
          color: '#444',
          marginBottom: '32px',
        }}>
          Крепеж производится сверху на министойки, что придает конструкции современный и лёгкий вид. В качестве поручня доступны варианты из натурального дерева или нержавеющей стали, что позволяет выбрать наиболее подходящее решение для вашего интерьера.
        </Paragraph>
        <Carousel images={images3} />
      </div>
    </main>
  );
}
