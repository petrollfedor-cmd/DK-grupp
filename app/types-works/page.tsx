'use client';

import Link from 'next/link';

const workTypes = [
  {
    image: '/figma/12:3.png',
    title: 'Проектирование фасадов и светопрозрачных конструкций',
  },
  {
    image: '/figma/12:23.png',
    title: 'Внутренние стеклянные светопрозрачные перегородки',
    link: '/types-works/glass-partitions',
  },
  {
    image: '/figma/12:26.png',
    title: 'Стеклянные лестничные ограждения',
    link: '/types-works/glass-staircases',
  },
  {
    image: '/figma/12:27.png',
    title: 'Остекление лифтовых шахт',
    link: '/types-works/elevator-shafts',
  },
  {
    image: '/figma/12:77.png',
    title: 'Противопожарные алюминиевые витражи и стальные конструкции',
    link: '/types-works/fire-windows',
  },
  {
    image: '/figma/12:76.png',
    title: 'Радиусные элементы. Фасады из алюминия, нержавеющей стали',
    link: '/types-works/radius-elements',
  },
  {
    image: '/figma/12:75.png',
    title: 'Стеклянные душевые',
    link: '/types-works/glass-showers',
  },
  {
    image: '/figma/12:74.png',
    title: 'Инженерная документация и разработка проектов',
    link: '/types-works/engineering',
  },
];

export default function TypesWorksPage() {
  return (
    <main className="types-works-main" style={{ padding: '40px 142px', maxWidth: '1920px', margin: '0 auto' }}>
      {/* Хлебные крошки */}
      <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Link
          href="/"
          style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '16px',
            color: '#23365E',
            textDecoration: 'none',
          }}
        >
          Главная
        </Link>
        <span style={{ color: '#23365E', opacity: 0.5 }}>/</span>
        <span style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '16px',
          color: '#23365E',
        }}>
          Типы работ
        </span>
        <span style={{ color: '#23365E', opacity: 0.5 }}>/</span>
        <span style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '16px',
          color: '#23365E',
          opacity: 0.6,
        }}>
          ...
        </span>
      </div>

      {/* Заголовок */}
      <h2 style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '28px',
        fontWeight: 600,
        color: '#23365E',
        marginBottom: '32px',
      }}>
        Типы работ:
      </h2>

      <style>{`
        @media (max-width: 768px) {
          .types-works-main {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .types-works-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .types-works-grid > a > div > div:first-child {
            aspect-ratio: 4/3 !important;
            height: auto !important;
          }
        }
      `}</style>

      {/* Сетка карточек 4x2 */}
      <div className="types-works-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
      }}>
        {workTypes.map((item, index) => (
          <Link href={item.link || '#'} key={index} style={{ textDecoration: 'none', display: 'contents' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                height: '100%',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'rotate(2deg) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Изображение */}
              <div style={{
                height: '200px',
                background: `url('${item.image}') center/cover no-repeat`,
                flexShrink: 0,
              }} />
              {/* Текст на синем фоне */}
              <div style={{
                backgroundColor: '#23365E',
                padding: '16px',
                flex: 1,
                display: 'flex',
                alignItems: 'center',
              }}>
                <div style={{
                  fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#fff',
                  lineHeight: 1.4,
                }}>
                  {item.title}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
