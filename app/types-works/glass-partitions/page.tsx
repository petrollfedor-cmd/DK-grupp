'use client';

import { Typography, Row, Col } from 'antd';
import { useState, useEffect } from 'react';

const { Title, Paragraph } = Typography;

const images = [
  '/figma/432:9.png',
  '/figma/photo1.jpg',
  '/figma/photo2.jpg',
  '/figma/photo3.jpg',
  '/figma/photo4.jpg',
];

export default function GlassPartitionsPage() {
  const [current, setCurrent] = useState(0);

  // Preload всех изображений при монтировании
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

  // Определяем какие фото показывать (по 2 за раз)
  const getVisible = () => {
    const visible = [];
    for (let i = 0; i < 2; i++) {
      visible.push(images[(current + i) % images.length]);
    }
    return visible;
  };
  const visible = getVisible();

  return (
    <main className="glass-partitions-main" style={{ padding: '40px 142px', maxWidth: '1200px', margin: '0 auto' }}>
      <style>{`
        @media (max-width: 768px) {
          .glass-partitions-main {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .gp-carousel {
            flex-direction: column !important;
            gap: 12px !important;
          }
          .gp-carousel-nav {
            width: 32px !important;
            height: 32px !important;
            font-size: 16px !important;
          }
          .gp-carousel-photos {
            flex-direction: column !important;
            gap: 12px !important;
          }
          .gp-carousel-photos > div {
            height: auto !important;
            aspect-ratio: 4/3 !important;
          }
          .gp-features-row .ant-col,
          .gp-options-row .ant-col {
            display: block !important;
            width: 100% !important;
            flex: 0 0 100% !important;
            max-width: 100% !important;
          }
          .gp-features-row .ant-col > div,
          .gp-options-row .ant-col > div {
            margin-bottom: 16px !important;
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
          Цельностеклянные перегородки
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
        Цельностеклянные перегородки для офиса:
      </h2>

      {/* Описание */}
      <Paragraph style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '16px',
        lineHeight: '1.8',
        color: '#444',
        marginBottom: '16px',
      }}>
        Цельностеклянные перегородки — это идеальное решение, объединяющее функциональность, безопасность и эстетику.
        Они позволяют рационально использовать каждый метр площади, визуально расширяют пространство, добавляют свет
        и легкость, а также повышают звукоизоляцию, обеспечивая комфортные условия для работы.
      </Paragraph>
      <Paragraph style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '16px',
        lineHeight: '1.8',
        color: '#444',
        marginBottom: '32px',
      }}>
        Эти перегородки особенно востребованы для зонирования офисов, бизнес-центров, банков и салонов красоты,
        а также являются отличным выбором для торговых центров и выставочных павильонов. Они служат эффективной
        альтернативой дорогостоящему ремонту и перепланировке.
      </Paragraph>

      {/* Варианты исполнений */}
      <Title level={3} style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '22px',
        fontWeight: 600,
        color: '#23365E',
        marginBottom: '24px',
      }}>
        Варианты исполнений:
      </Title>

      {/* Карусель */}
      <div className="gp-carousel" style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '64px',
      }}>
        <div className="gp-carousel-nav" style={{
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

        <div className="gp-carousel-photos" style={{
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
              key={`left-${current}`}
              src={visible[0]}
              alt={`Цельностеклянные перегородки ${current + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
              key={`right-${current}`}
              src={visible[1]}
              alt={`Цельностеклянные перегородки ${current + 2}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading="lazy"
            />
          </div>
        </div>

        <div className="gp-carousel-nav" style={{
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

      {/* Особенности конструкций */}
      <Title level={3} style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '22px',
        fontWeight: 600,
        color: '#23365E',
        marginBottom: '32px',
      }}>
        Особенности конструкций:
      </Title>
      <Row gutter={[32, 32]} className="gp-features-row" style={{ marginBottom: '64px' }}>
        <Col span={8}>
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
              Конструкция
            </Title>
            <Paragraph style={{
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#444',
              margin: 0,
            }}>
              Цельностеклянные перегородки представляют собой модульные системы из стеклянных панелей толщиной 10-12 мм, которые устанавливаются стык-в-стык. Они могут иметь разнообразную конфигурацию и дизайнерское оформление.
            </Paragraph>
          </div>
        </Col>
        <Col span={8}>
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
              Внешний вид
            </Title>
            <Paragraph style={{
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#444',
              margin: 0,
            }}>
              Конструкции выглядят как воздушные сооружения без рам и вертикальных профилей, заполняя пространство от пола до потолка стеклом. Монтаж осуществляется по полу и потолку в зажимные профили или с использованием точечных стальных держателей.
            </Paragraph>
          </div>
        </Col>
        <Col span={8}>
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
              Изготовление
            </Title>
            <Paragraph style={{
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#444',
              margin: 0,
            }}>
              Мы изготавливаем перегородки на заказ, учитывая индивидуальные параметры и дизайнерские решения. Наши услуги включают замеры, разработку дизайн-проекта, производство, установку и обслуживание, обеспечивая решение любых конструктивных и дизайнерских задач.
            </Paragraph>
          </div>
        </Col>
      </Row>

      {/* Особенности материала */}
      <Title level={3} style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '22px',
        fontWeight: 600,
        color: '#23365E',
        marginBottom: '24px',
      }}>
        Особенности материала:
      </Title>
      <Paragraph style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '16px',
        lineHeight: '1.8',
        color: '#444',
        marginBottom: '32px',
      }}>
        Цельностеклянные перегородки изготавливаются из закалённого стекла толщиной 10-12 мм. Этот материал обладает высокими показателями прочности и безопасности:
      </Paragraph>

      {/* Сверхпрочность */}
      <div style={{ marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#23365E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '16px',
          flexShrink: 0,
        }}>
          💪
        </div>
        <div>
          <Title level={5} style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: '#23365E',
            marginBottom: '8px',
          }}>
            Сверхпрочность
          </Title>
          <Paragraph style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#444',
            margin: 0,
          }}>
            Закалённое стекло устойчиво к механическим воздействиям, его в 7 раз сложнее разбить, чем обычное.
          </Paragraph>
        </div>
      </div>

      {/* Безопасность */}
      <div style={{ marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#23365E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '16px',
          flexShrink: 0,
        }}>
          🛡️
        </div>
        <div>
          <Title level={5} style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: '#23365E',
            marginBottom: '8px',
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
            При разбивании стекло рассыпается на мелкие, не острые осколки, которые не представляют опасности. Оно покрывается специальной микроплёнкой, предотвращающей разлёт осколков.
          </Paragraph>
        </div>
      </div>

      {/* Термостойкость */}
      <div style={{ marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#23365E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '16px',
          flexShrink: 0,
        }}>
          🌡️
        </div>
        <div>
          <Title level={5} style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: '#23365E',
            marginBottom: '8px',
          }}>
            Термостойкость
          </Title>
          <Paragraph style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#444',
            margin: 0,
          }}>
            Стекло выдерживает температуру до +250°C и холод до -70°C, что делает его пожаростойким и морозостойким.
          </Paragraph>
        </div>
      </div>

      {/* Варианты перегородок */}
      <Title level={3} style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '22px',
        fontWeight: 600,
        color: '#23365E',
        marginBottom: '16px',
      }}>
        Мы изготавливаем все возможные варианты перегородок из стеклянных панелей:
      </Title>
      <Row gutter={[24, 24]} className="gp-options-row" style={{ marginBottom: '32px' }}>
        <Col span={8}>
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
              Купе
            </Title>
            <Paragraph style={{
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#444',
              margin: 0,
            }}>
              Панели, которые перемещаются по направляющим, идеальны для узких коридоров.
            </Paragraph>
          </div>
        </Col>
        <Col span={8}>
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
              Радиусные
            </Title>
            <Paragraph style={{
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#444',
              margin: 0,
            }}>
              Полукруглые панели, перемещающиеся по изогнутым направляющим.
            </Paragraph>
          </div>
        </Col>
        <Col span={8}>
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
              Подвесные
            </Title>
            <Paragraph style={{
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#444',
              margin: 0,
            }}>
              Панели крепятся к потолку или проёмам с использованием направляющей и роликового механизма
            </Paragraph>
          </div>
        </Col>
      </Row>

      {/* Оформление */}
      <Paragraph style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '16px',
        lineHeight: '1.8',
        color: '#444',
        marginBottom: '48px',
      }}>
        Оформление панелей может быть разнообразным: цветные, матовые плёнки, фотопечать, пескоструйные рисунки, витрирование и алмазная гравировка. Полностью прозрачные конструкции создают иллюзию просторности даже в небольших помещениях.
      </Paragraph>

      {/* Процесс установки */}
      <Title level={3} style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '22px',
        fontWeight: 600,
        color: '#23365E',
        marginBottom: '24px',
      }}>
        Процесс установки цельностеклянных перегородок включает следующие этапы:
      </Title>

      <div style={{ marginBottom: '20px' }}>
        <Title level={5} style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '16px',
          fontWeight: 600,
          color: '#23365E',
          marginBottom: '8px',
        }}>
          • Подготовительный
        </Title>
        <Paragraph style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '15px',
          lineHeight: '1.7',
          color: '#444',
          margin: 0,
        }}>
          Проверка пола, потолка и стен на наличие дефектов и их устранение
        </Paragraph>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <Title level={5} style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '16px',
          fontWeight: 600,
          color: '#23365E',
          marginBottom: '8px',
        }}>
          • Разметка
        </Title>
        <Paragraph style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '15px',
          lineHeight: '1.7',
          color: '#444',
          margin: 0,
        }}>
          Определение расположения профилей и направляющих с использованием лазерного уровня
        </Paragraph>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <Title level={5} style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '16px',
          fontWeight: 600,
          color: '#23365E',
          marginBottom: '8px',
        }}>
          • Установка
        </Title>
        <Paragraph style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '15px',
          lineHeight: '1.7',
          color: '#444',
          margin: 0,
        }}>
          Сверление отверстий, крепление зажимных профилей, сборка конструкции, выравнивание и регулировка
        </Paragraph>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <Title level={5} style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '16px',
          fontWeight: 600,
          color: '#23365E',
          marginBottom: '8px',
        }}>
          • Навешивание дверей и маскировка профилей
        </Title>
        <Paragraph style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '15px',
          lineHeight: '1.7',
          color: '#444',
          margin: 0,
        }}>
          Установка дверных полотен и маскировка профилей декоративными панелями
        </Paragraph>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <Title level={5} style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '16px',
          fontWeight: 600,
          color: '#23365E',
          marginBottom: '8px',
        }}>
          • Тестирование
        </Title>
        <Paragraph style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '15px',
          lineHeight: '1.7',
          color: '#444',
          margin: 0,
        }}>
          Проверка функциональности установленной конструкции
        </Paragraph>
      </div>
    </main>
  );
}
