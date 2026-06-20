'use client';

import { Typography } from 'antd';
import { useEffect, useState } from 'react';

const { Title, Paragraph } = Typography;

const configurations = [
  {
    id: 'swing',
    label: 'Распашные двери',
    description: 'Классический вариант с распашными стеклянными дверями',
  },
  {
    id: 'slide',
    label: 'Откатные двери',
    description: 'Экономия пространства благодаря раздвижной системе',
  },
  {
    id: 'chameleon',
    label: 'Хамелеон',
    description: 'Затемняющееся стекло — от прозрачного к матовому',
  },
  {
    id: 'corner',
    label: 'Угловая конфигурация',
    description: 'Компактное решение для угловых пространств',
  },
];

export default function GlassShowersPage() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handleNext = () => {
    if (animating) return;
    setAnimating(true);
    setActive((prev) => (prev + 1) % configurations.length);
    setTimeout(() => setAnimating(false), 600);
  };

  const handlePrev = () => {
    if (animating) return;
    setAnimating(true);
    setActive((prev) => (prev - 1 + configurations.length) % configurations.length);
    setTimeout(() => setAnimating(false), 600);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!animating) handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [animating]);

  const current = configurations[active];

  return (
    <main style={{ padding: '40px 142px', maxWidth: '1200px', margin: '0 auto' }}>
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
          Стеклянные душевые
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
        Стеклянные душевые
      </h2>

      {/* Описание */}
      <Paragraph style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '16px',
        lineHeight: '1.8',
        color: '#444',
        marginBottom: '16px',
      }}>
        Душевая кабина на заказ — это идеальное сочетание стиля, практичности и функциональности для любой ванной комнаты.
        Независимо от площади и планировки вашего пространства, мы предлагаем решения, которые будут соответствовать вашим требованиям и предпочтениям.
      </Paragraph>
      <Paragraph style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '16px',
        lineHeight: '1.8',
        color: '#444',
        marginBottom: '40px',
      }}>
        Наши душевые кабины и перегородки подходят не только для жилых помещений, таких как дома и квартиры, но и для коммерческих объектов, включая бани, спортивные комплексы и офисы. Они привносят в пространство легкость и визуально расширяют его, создавая ощущение простора.
      </Paragraph>

      {/* Карточки конфигураций */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', justifyContent: 'center' }}>
        {configurations.map((cfg, idx) => (
          <button
            key={cfg.id}
            onClick={() => {
              setActive(idx);
              setAnimating(true);
              setTimeout(() => setAnimating(false), 600);
            }}
            style={{
              padding: '12px 24px',
              border: active === idx ? '2px solid #23365E' : '2px solid #ddd',
              borderRadius: '8px',
              backgroundColor: active === idx ? '#23365E' : '#fff',
              color: active === idx ? '#fff' : '#444',
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '15px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {cfg.label}
          </button>
        ))}
      </div>

      {/* Анимированная демонстрация */}
      <div style={{
        position: 'relative',
        height: '500px',
        marginBottom: '20px',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      }}>
        {/* Распашные двери */}
        {active === 0 && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #e8f4f8 0%, #f0f8ff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: '300px',
              height: '400px',
              position: 'relative',
            }}>
              {/* Рама */}
              <div style={{
                position: 'absolute',
                inset: 0,
                border: '8px solid #23365E',
                borderRadius: '4px',
                backgroundColor: 'rgba(200, 230, 255, 0.3)',
              }} />
              {/* Распашная дверь */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '50%',
                border: '8px solid #23365E',
                backgroundColor: 'rgba(200, 230, 255, 0.5)',
                transformOrigin: 'left center',
                animation: 'swing 3s ease-in-out infinite',
              }}>
                <div style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#23365E',
                }} />
              </div>
            </div>
          </div>
        )}

        {/* Откатные двери */}
        {active === 1 && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #f0f8ff 0%, #e8f4f8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: '400px',
              height: '400px',
              position: 'relative',
            }}>
              {/* Рама */}
              <div style={{
                position: 'absolute',
                inset: 0,
                border: '8px solid #23365E',
                borderRadius: '4px',
                backgroundColor: 'rgba(200, 230, 255, 0.3)',
              }} />
              {/* Раздвижная дверь */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '50%',
                border: '8px solid #23365E',
                backgroundColor: 'rgba(200, 230, 255, 0.5)',
                animation: 'slide 3s ease-in-out infinite',
              }}>
                <div style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#23365E',
                }} />
              </div>
            </div>
          </div>
        )}

        {/* Хамелеон — один человек, затемняемое стекло */}
        {active === 2 && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, #d4e8f0 0%, #b8d4e3 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
            {/* Ванная комната */}
            <div style={{
              position: 'relative',
              width: '500px',
              height: '420px',
            }}>
              {/* Задняя стена */}
              <div style={{
                position: 'absolute',
                inset: '40px 0',
                backgroundColor: '#e8e8e8',
                borderRadius: '4px',
              }} />

              {/* Пол */}
              <div style={{
                position: 'absolute',
                bottom: '40px',
                left: 0,
                right: 0,
                height: '40px',
                background: 'linear-gradient(180deg, #c0c0c0 0%, #a0a0a0 100%)',
              }} />

              {/* Душевая кабина — одна рама */}
              <div style={{
                position: 'absolute',
                left: '40px',
                top: '60px',
                width: '420px',
                height: '340px',
                border: '6px solid #23365E',
                borderRadius: '4px',
                overflow: 'hidden',
              }}>
                {/* Стеклянная панель — затемняется */}
                <div style={{
                  position: 'absolute',
                  inset: '6px',
                  animation: 'chameleon 6s ease-in-out infinite',
                }} />

                {/* Душевая лейка */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '50px',
                  height: '10px',
                  backgroundColor: '#23365E',
                  borderRadius: '5px',
                  zIndex: 5,
                }} />

                {/* Человек внутри */}
                <div style={{
                  position: 'absolute',
                  bottom: '40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '90px',
                  height: '220px',
                  zIndex: 3,
                  animation: 'disappear 6s ease-in-out infinite',
                }}>
                  {/* Голова */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#f5d6b8',
                    margin: '0 auto 8px',
                  }} />
                  {/* Тело */}
                  <div style={{
                    width: '55px',
                    height: '110px',
                    backgroundColor: '#4a90d9',
                    borderRadius: '10px 10px 0 0',
                    margin: '0 auto',
                  }} />
                  {/* Руки */}
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '-12px',
                    width: '115px',
                    height: '80px',
                    border: '14px solid #f5d6b8',
                    borderRadius: '40px',
                    borderRight: 'none',
                    borderBottom: 'none',
                    transform: 'rotate(-15deg)',
                  }} />
                  {/* Ноги */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                  }}>
                    <div style={{
                      width: '20px',
                      height: '65px',
                      backgroundColor: '#f5d6b8',
                      borderRadius: '0 0 8px 8px',
                    }} />
                    <div style={{
                      width: '20px',
                      height: '65px',
                      backgroundColor: '#f5d6b8',
                      borderRadius: '0 0 8px 8px',
                    }} />
                  </div>
                </div>

                {/* Падающие капли */}
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: `${20 + Math.random() * 60}%`,
                      top: '22px',
                      width: '3px',
                      height: '14px',
                      backgroundColor: 'rgba(100, 180, 255, 0.7)',
                      borderRadius: '2px',
                      animation: `rain ${1 + Math.random() * 0.5}s ease-in infinite`,
                      animationDelay: `${Math.random() * 2}s`,
                      zIndex: 4,
                    }}
                  />
                ))}

                {/* Брызги на полу */}
                <div style={{
                  position: 'absolute',
                  bottom: '30px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '120px',
                  height: '15px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(100, 180, 255, 0.2)',
                  animation: 'splash 2s ease-out infinite',
                }} />
              </div>

              {/* Подпись */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(35, 54, 94, 0.9)',
                color: '#fff',
                padding: '8px 20px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
                whiteSpace: 'nowrap',
              }}>
                Хамелеон: прозрачное ↔ затемненное
              </div>
            </div>
          </div>
        )}

        {/* Угловая */}
        {active === 3 && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #f0f8ff 0%, #e8f4f8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: '350px',
              height: '350px',
              position: 'relative',
              transform: 'rotate(-45deg)',
            }}>
              {/* Угловая рама */}
              <div style={{
                position: 'absolute',
                inset: 0,
                border: '8px solid #23365E',
                borderRadius: '4px',
                backgroundColor: 'rgba(200, 230, 255, 0.3)',
              }} />
              {/* Стеклянная панель */}
              <div style={{
                position: 'absolute',
                inset: '8px',
                backgroundColor: 'rgba(200, 230, 255, 0.5)',
                animation: 'corner 3s ease-in-out infinite',
              }} />
            </div>
          </div>
        )}

        {/* Навигация */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '20px',
          transform: 'translateY(-50%)',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'rgba(35, 54, 94, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '20px',
          cursor: 'pointer',
          border: 'none',
          zIndex: 10,
        }} onClick={handlePrev}>
          ←
        </div>
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '20px',
          transform: 'translateY(-50%)',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'rgba(35, 54, 94, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '20px',
          cursor: 'pointer',
          border: 'none',
          zIndex: 10,
        }} onClick={handleNext}>
          →
        </div>

        {/* Индикаторы */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
        }}>
          {configurations.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: active === idx ? '32px' : '12px',
                height: '12px',
                borderRadius: '6px',
                backgroundColor: active === idx ? '#23365E' : 'rgba(35, 54, 94, 0.3)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Описание текущей конфигурации */}
      <div style={{
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
      }}>
        <Title level={4} style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '20px',
          fontWeight: 600,
          color: '#23365E',
          marginBottom: '8px',
        }}>
          {current.label}
        </Title>
        <Paragraph style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '16px',
          color: '#666',
          margin: 0,
        }}>
          {current.description}
        </Paragraph>
      </div>

      {/* Стили анимации */}
      <style>{`
        @keyframes swing {
          0%, 100% { transform: rotateY(0deg); }
          50% { transform: rotateY(-25deg); }
        }
        @keyframes slide {
          0%, 100% { left: 0; }
          50% { left: 50%; }
        }
        @keyframes chameleon {
          0%, 100% { backgroundColor: rgba(173, 216, 230, 0.15); backdrop-filter: blur(0px); }
          50% { backgroundColor: rgba(50, 50, 50, 0.75); backdrop-filter: blur(3px); }
        }
        @keyframes corner {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        @keyframes rain {
          0% { top: 20px; opacity: 1; }
          100% { top: 300px; opacity: 0; }
        }
        @keyframes splash {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.3; }
          50% { transform: translateX(-50%) scale(1.2); opacity: 0.5; }
        }
        @keyframes disappear {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </main>
  );
}
