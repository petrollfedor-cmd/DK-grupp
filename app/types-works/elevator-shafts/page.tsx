'use client';

import { Typography, Row, Col } from 'antd';
import type { Metadata } from 'next';
import { useState, useEffect } from 'react';

const { Title, Paragraph } = Typography;

const images = [
  '/figma/255:45.png',
  '/figma/255:48.png',
  '/figma/lift1.png',
  '/figma/lift2.jpg',
];

export const metadata: Metadata = {
  title: 'Остекление лифтовых шахт панорамными лифтами | ООО ДК ГРУПП',
  description: 'Панорамные лифты и остекление лифтовых шахт. Безрамные и каркасные системы, стеклянные шахты лифтов для ТЦ, бизнес-центров.',
};

export default function ElevatorShaftsPage() {
  const [current, setCurrent] = useState(0);

  // Preload всех изображений при монтировании
  useEffect(() => {
    images.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Показываем одно фото
  const getVisible = () => {
    return [images[current]];
  };
  const visible = getVisible();

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
          Остекление лифтовых шахт
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
        Остекление лифтовых шахт:
      </h2>

      {/* Преимущества */}
      <Title level={3} style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '22px',
        fontWeight: 600,
        color: '#23365E',
        marginBottom: '24px',
      }}>
        Преимущества панорамных лифтов
      </Title>

      <Row gutter={[24, 24]} style={{ marginBottom: '48px' }}>
        <Col span={12}>
          <div style={{
            border: '2px solid #23365E',
            borderRadius: '8px',
            padding: '24px',
            height: '100%',
          }}>
            <Title level={4} style={{
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '18px',
              fontWeight: 600,
              color: '#23365E',
              marginBottom: '12px',
            }}>
              Универсальность
            </Title>
            <Paragraph style={{
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#444',
              margin: 0,
            }}>
              Панорамный лифт можно установить как в невысоком здании, так и в небоскребе. Он открывает обзор на пейзажи или интерьеры.
            </Paragraph>
          </div>
        </Col>
        <Col span={12}>
          <div style={{
            border: '2px solid #23365E',
            borderRadius: '8px',
            padding: '24px',
            height: '100%',
          }}>
            <Title level={4} style={{
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '18px',
              fontWeight: 600,
              color: '#23365E',
              marginBottom: '12px',
            }}>
              Эффектность
            </Title>
            <Paragraph style={{
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#444',
              margin: 0,
            }}>
              Особенно впечатляют лифты с прозрачным полом, создавая захватывающий вид и незабываемые впечатления.
            </Paragraph>
          </div>
        </Col>
      </Row>

      {/* Карусель */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '64px',
      }}>
        <div style={{
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

        <div style={{
          display: 'flex',
          gap: '20px',
          maxWidth: '1000px',
          justifyContent: 'center',
        }}>
          {/* Фото */}
          <div style={{
            width: '100%',
            maxWidth: '500px',
            height: '400px',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          }}>
            <img
              key={`single-${current}`}
              src={visible[0]}
              alt={`Остекление лифтовых шахт ${current + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading="lazy"
            />
          </div>
        </div>

        <div style={{
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

      {/* Сферы применения */}
      <Title level={3} style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '22px',
        fontWeight: 600,
        color: '#23365E',
        marginBottom: '32px',
      }}>
        Сферы применения панорамных лифтов:
      </Title>

      <Row gutter={[32, 32]} style={{ marginBottom: '64px' }}>
        <Col span={8}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{
              flexShrink: 0,
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img src="/figma/free-icon-mall-5140134 1.svg" alt="Торговые комплексы" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
            </div>
            <div>
              <Paragraph style={{
                fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '15px',
                lineHeight: '1.6',
                color: '#444',
                margin: 0,
              }}>
                Торговые и развлекательные комплексы
              </Paragraph>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{
              flexShrink: 0,
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img src="/figma/free-icon-city-hall-761534 1.svg" alt="Деловые центры" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
            </div>
            <div>
              <Paragraph style={{
                fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '15px',
                lineHeight: '1.6',
                color: '#444',
                margin: 0,
              }}>
                Деловые центры
              </Paragraph>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{
              flexShrink: 0,
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img src="/figma/free-icon-city-center-7493874 1.svg" alt="Административные здания" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
            </div>
            <div>
              <Paragraph style={{
                fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '15px',
                lineHeight: '1.6',
                color: '#444',
                margin: 0,
              }}>
                Административные здания и другие объекты коммерческого и социального назначения
              </Paragraph>
            </div>
          </div>
        </Col>
      </Row>

      {/* Производство стекла */}
      <Title level={3} style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '22px',
        fontWeight: 600,
        color: '#23365E',
        marginBottom: '16px',
      }}>
        Производство стекла для лифтовых шахт:
      </Title>

      <Paragraph style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '15px',
        lineHeight: '1.8',
        color: '#444',
        marginBottom: '24px',
      }}>
        В реализации архитектурных проектов по остеклению лифтовых шахт используются высокопрочные материалы, которые выдерживают механические нагрузки, вибрацию и погодные воздействия (температурные перепады, ветер, осадки):
      </Paragraph>

      <ul style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '15px',
        lineHeight: '2',
        color: '#444',
        paddingLeft: '24px',
        marginBottom: '48px',
      }}>
        <li>Толстое ударопрочное закаленное стекло</li>
        <li>Триплекс</li>
      </ul>

      {/* Важные качества */}
      <Title level={3} style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '22px',
        fontWeight: 600,
        color: '#23365E',
        marginBottom: '24px',
      }}>
        Важные качества:
      </Title>

      <Row gutter={[24, 24]}>
        <Col span={12}>
          <div style={{
            border: '2px solid #23365E',
            borderRadius: '8px',
            padding: '24px',
            height: '100%',
          }}>
            <Title level={4} style={{
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '18px',
              fontWeight: 600,
              color: '#23365E',
              marginBottom: '12px',
            }}>
              Безопасность
            </Title>
            <Paragraph style={{
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#444',
              margin: 0,
            }}>
              Даже при разбитии стекло не осыпается осколками, способными нанести травму.
            </Paragraph>
          </div>
        </Col>
        <Col span={12}>
          <div style={{
            border: '2px solid #23365E',
            borderRadius: '8px',
            padding: '24px',
            height: '100%',
          }}>
            <Title level={4} style={{
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '18px',
              fontWeight: 600,
              color: '#23365E',
              marginBottom: '12px',
            }}>
              Вариативность
            </Title>
            <Paragraph style={{
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#444',
              margin: 0,
            }}>
              Панорамные шахты лифта могут быть прямолинейными или сферическими, с использованием плоского или изогнутого, прозрачного или матового стекла.
            </Paragraph>
          </div>
        </Col>
      </Row>

      {/* Виды систем остекления */}
      <Title level={3} style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '22px',
        fontWeight: 600,
        color: '#23365E',
        marginBottom: '24px',
      }}>
        Виды систем остекления лифтовых шахт:
      </Title>

      <div style={{ marginBottom: '48px' }}>
        <div style={{ marginBottom: '20px' }}>
          <Paragraph style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '15px',
            fontWeight: 600,
            lineHeight: '1.7',
            color: '#23365E',
            margin: 0,
          }}>
            • Безрамные
          </Paragraph>
          <Paragraph style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#444',
            margin: '8px 0 0 0',
          }}>
            Светопрозрачный короб фиксируется незаметными элементами.
          </Paragraph>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Paragraph style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '15px',
            fontWeight: 600,
            lineHeight: '1.7',
            color: '#23365E',
            margin: 0,
          }}>
            • С видимым каркасом
          </Paragraph>
          <Paragraph style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#444',
            margin: '8px 0 0 0',
          }}>
            Из металла или металлопластика.
          </Paragraph>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Paragraph style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '15px',
            fontWeight: 600,
            lineHeight: '1.7',
            color: '#23365E',
            margin: 0,
          }}>
            • Самонесущие
          </Paragraph>
          <Paragraph style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#444',
            margin: '8px 0 0 0',
          }}>
            Применяется стоечно-ригельная система (СРС), алюминиевые витражи или винтовые растяжки с каркасом из стали или дерева. Фасадными элементами шахты являются листы закалённого стекла или усиленные стеклопакеты.
          </Paragraph>
        </div>
      </div>

      {/* Соответствие ГОСТ */}
      <Title level={3} style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '22px',
        fontWeight: 600,
        color: '#23365E',
        marginBottom: '16px',
      }}>
        Соответствие ГОСТ:
      </Title>

      <Paragraph style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '15px',
        lineHeight: '1.8',
        color: '#444',
        marginBottom: '32px',
      }}>
        Остекление лифтовых шахт регламентируется ГОСТ 12506-81, который включает:
      </Paragraph>

      <Row gutter={[32, 32]}>
        <Col span={12}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{
              flexShrink: 0,
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#23365E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '4px',
            }}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 6L6 10.5L14.5 1.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <Paragraph style={{
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '15px',
              lineHeight: '1.6',
              color: '#444',
              margin: 0,
              paddingBottom: '8px',
              borderBottom: '2px solid #23365E',
            }}>
              Разновидности и габариты конструкций
            </Paragraph>
          </div>
        </Col>
        <Col span={12}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{
              flexShrink: 0,
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#23365E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '4px',
            }}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 6L6 10.5L14.5 1.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <Paragraph style={{
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '15px',
              lineHeight: '1.6',
              color: '#444',
              margin: 0,
              paddingBottom: '8px',
              borderBottom: '2px solid #23365E',
            }}>
              Спецификации стекол
            </Paragraph>
          </div>
        </Col>
        <Col span={12}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{
              flexShrink: 0,
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#23365E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '4px',
            }}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 6L6 10.5L14.5 1.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <Paragraph style={{
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '15px',
              lineHeight: '1.6',
              color: '#444',
              margin: 0,
              paddingBottom: '8px',
              borderBottom: '2px solid #23365E',
            }}>
              Методы маркировки и прочие параметры
            </Paragraph>
          </div>
        </Col>
        <Col span={12}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{
              flexShrink: 0,
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#23365E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '4px',
            }}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 6L6 10.5L14.5 1.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <Paragraph style={{
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '15px',
              lineHeight: '1.6',
              color: '#444',
              margin: 0,
              paddingBottom: '8px',
              borderBottom: '2px solid #23365E',
            }}>
              Оптимальную фурнитуру
            </Paragraph>
          </div>
        </Col>
      </Row>
    </main>
  );
}
