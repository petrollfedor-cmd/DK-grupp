'use client';

import { Typography } from 'antd';
import { useState, useEffect } from 'react';

const { Title, Paragraph } = Typography;

const images = [
  '/figma/261:37.png',
  '/figma/261:40.png',
  '/figma/261:43.png',
];

export default function RadiusElementsPage() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handleNext = () => {
    if (animating) return;
    setAnimating(true);
    setCurrent((prev) => (prev + 1) % images.length);
    setTimeout(() => setAnimating(false), 600);
  };

  const handlePrev = () => {
    if (animating) return;
    setAnimating(true);
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setAnimating(false), 600);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!animating) setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [animating]);

  return (
    <main className="radius-main" style={{ padding: '40px 142px', maxWidth: '1200px', margin: '0 auto' }}>
      <style>{`
        @media (max-width: 768px) {
          .radius-main {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .radius-carousel {
            flex-direction: column !important;
            gap: 12px !important;
          }
          .radius-carousel-nav {
            width: 32px !important;
            height: 32px !important;
            font-size: 16px !important;
          }
          .radius-carousel-img {
            width: 100% !important;
            height: auto !important;
            max-height: 300px !important;
            aspect-ratio: 4/3 !important;
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
          Радиусные элементы
        </span>
      </div>

      {/* Заголовок */}
      <h2 style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '28px',
        fontWeight: 600,
        color: '#23365E',
        marginBottom: '16px',
      }}>
        Радиусные элементы для колонн и фасадов из алюминия, нержавеющей и оцинкованной стали
      </h2>

      {/* Описание */}
      <Paragraph style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '16px',
        lineHeight: '1.8',
        color: '#444',
        marginBottom: '16px',
      }}>
        Наша компания специализируется на производстве высококачественных радиусных элементов, которые используются для облицовки и декорирования колонн.
      </Paragraph>
      <Paragraph style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '16px',
        lineHeight: '1.8',
        color: '#444',
        marginBottom: '40px',
      }}>
        Наше оборудование и профессиональные навыки позволяют нам создавать элементы любой сложности, идеально подходящие для спортивных и общественных зданий. Мы гордимся качеством нашей работы и тем, что наш продукт помогает создавать функциональные и эстетически привлекательные пространства.
      </Paragraph>

      {/* Карусель */}
      <div className="radius-carousel" style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '40px',
      }}>
        <div className="radius-carousel-nav" style={{
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

        <div className="radius-carousel-img" style={{
          width: '1000px',
          height: '350px',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        }}>
          <img
            key={`radius-${current}`}
            src={images[current]}
            alt={`Радиусные элементы ${current + 1}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        </div>

        <div className="radius-carousel-nav" style={{
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

      {/* Текст */}
      <Paragraph style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '16px',
        lineHeight: '1.8',
        color: '#444',
        textAlign: 'center',
        marginBottom: '32px',
        maxWidth: '700px',
        margin: '0 auto 32px',
      }}>
        В видео представлено, как мы используем современные технологии вальцовки для обработки АКП, листового алюминия,
        нержавеющей и оцинкованной стали. Эти радиусные элементы не только придают зданиям стильный и современный вид,
        но и обеспечивают долговечность и надежность конструкций.
      </Paragraph>

      {/* Видео */}
      <div style={{
        marginBottom: '40px',
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto',
          paddingTop: '56.25%',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}>
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Технология вальцовки радиусных элементов"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </main>
  );
}
