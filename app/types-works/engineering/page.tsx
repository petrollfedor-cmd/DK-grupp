'use client';

import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const advantages = [
  {
    title: 'Опыт и экспертиза',
    text: 'Более 850 успешных проектов различной сложности. Наша команда учитывает все особенности объектов и требования отраслевых стандартов.',
  },
  {
    title: 'Широкая география',
    text: 'Множество структурных подразделений в разных городах России для быстрой реакции на запросы клиентов.',
  },
  {
    title: 'Квалифицированная команда',
    text: '32 специалиста с глубокими знаниями и опытом, постоянно совершенствующих свои навыки.',
  },
  {
    title: 'Высокие стандарты',
    text: 'Мы стремимся к предоставлению услуг высшего качества и соблюдению сроков, гарантируя полное удовлетворение потребностей клиентов.',
  },
];

export default function EngineeringPage() {
  return (
    <main style={{ padding: '40px 142px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Хлебные крошки */}
      <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
          Разработка инженерной документации
        </span>
      </div>

      {/* Заголовок */}
      <h2 style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '28px',
        fontWeight: 600,
        color: '#23365E',
        marginBottom: '24px',
      }}>
        Разработка инженерной документации и проектов производства работ
      </h2>

      {/* Ключевые направления */}
      <h3 style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '20px',
        fontWeight: 600,
        color: '#23365E',
        marginBottom: '16px',
      }}>
        Ключевые направления:
      </h3>
      <Paragraph style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '16px',
        lineHeight: '1.8',
        color: '#444',
        marginBottom: '32px',
      }}>
        ООО «ДК ГРУПП» — ваш надежный партнер в разработке инженерной документации и управлении проектами. 
        Мы предлагаем комплексные решения в области проектирования и инженерии, используя современные технологии 
        для повышения эффективности и качества работы.
      </Paragraph>

      {/* Карточки направлений */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
        marginBottom: '48px',
      }}>
        <div style={{
          border: '2px solid #23365E',
          borderRadius: '8px',
          padding: '24px',
        }}>
          <Title level={4} style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '18px',
            fontWeight: 600,
            color: '#23365E',
            marginBottom: '12px',
          }}>
            Разработка инженерной документации
          </Title>
          <Paragraph style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#444',
            margin: 0,
          }}>
            Мы предоставляем полный спектр услуг по созданию документации для различных строительных и инженерных проектов.
          </Paragraph>
        </div>

        <div style={{
          border: '2px solid #23365E',
          borderRadius: '8px',
          padding: '24px',
        }}>
          <Title level={4} style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '18px',
            fontWeight: 600,
            color: '#23365E',
            marginBottom: '12px',
          }}>
            Удаленный отдел ПТО
          </Title>
          <Paragraph style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#444',
            margin: 0,
          }}>
            Обеспечиваем удаленное управление проектами строительных компаний, включая разработку и сопровождение проектной документации.
          </Paragraph>
        </div>
      </div>

      {/* Преимущества */}
      <h3 style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '20px',
        fontWeight: 600,
        color: '#23365E',
        marginBottom: '24px',
      }}>
        Наши преимущества:
      </h3>
      {advantages.map((adv, idx) => (
        <div key={idx} style={{ marginBottom: '20px' }}>
          <Title level={5} style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: '#23365E',
            marginBottom: '8px',
          }}>
            • {adv.title}
          </Title>
          <Paragraph style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#444',
            margin: 0,
          }}>
            {adv.text}
          </Paragraph>
        </div>
      ))}
    </main>
  );
}
