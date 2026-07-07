'use client';

import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const benefits = [
  {
    icon: '/figma/Group.png',
    title: 'Выбор лидеров рынка',
    description:
      'Мы интегрируем лучшие профильные системы, чтобы предложить вам идеальное решение для любой задачи. Работаем с эталонной Немецкой маркой - Schüco, энергоэффективными системами - Alutech и инновационными Российскими профилями - Mastech.',
  },
  {
    icon: '/figma/Group (1).png',
    title: 'Прозрачность и честность',
    description:
      'Итоговая стоимость в 90% случаев совпадает с предварительной сметой. Мы подбираем оптимальные решения без маркетинговых уловок, чтобы реальность превзошла ваши ожидания.',
  },
  {
    icon: '/figma/Group (2).png',
    title: 'Гарантия результата "под ключ"',
    description:
      'Полный цикл работ: проектирование, производство, монтаж и сервис. Ваш объект в Москве, Крыму, Сочи или на Камчатке — мы обеспечим своевременные поставки и безупречное качество исполнения.',
  },
  {
    icon: '/figma/Group (3).png',
    title: 'Техническая поддержка и расширенная гарантия',
    description:
      'Мы не просто поставляем конструкции, мы несем за них ответственность. Наши инженеры сопровождают проект на всех этапах, а вы получаете уверенность в долговечности каждого элемента.',
  },
];

const services = [
  {
    icon: '/figma/Group (4).png',
    title: 'Разработку идей и концепций',
    description: '',
  },
  {
    icon: '/figma/Group (5).png',
    title: 'Выполнение строительных работ',
    description: 'Выполнение строительных работ различных типов: внешние, электрические, механические, противопожарные, низковольтные, автоматические, ландшафтные и др.',
  },
  {
    icon: '/figma/Group (7).png',
    title: 'Исследование рынка и технико-экономическое обоснование',
    description: '',
  },
  {
    icon: '/figma/Group (8).png',
    title: 'Технический контроль и управление проектом',
    description: '',
  },
  {
    icon: '/figma/Group (9).png',
    title: 'Подготовку проектной документации и получение разрешений',
    description: '',
  },
  {
    icon: '/figma/Group (10).png',
    title: 'Тестирование, ввод в эксплуатацию и сдачу объектов',
    description: '',
  },
];

export default function About() {
  return (
    <section style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Breadcrumbs */}
      <div style={{ marginBottom: '24px', fontSize: '14px', color: '#999' }}>
        <span style={{ color: '#1e3a5f', fontWeight: 500 }}>Главная</span>
        <span style={{ margin: '0 8px' }}>/</span>
        <span style={{ borderBottom: '2px solid #1e3a5f', paddingBottom: '2px' }}>О компании</span>
      </div>

      {/* Title */}
      <Title level={2} style={{ marginBottom: '24px', color: '#1e3a5f' }}>
        О компании:
      </Title>

      {/* Mission */}
      <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '48px', color: '#333' }}>
        «ДК ГРУПП» — строительная компания, выступающая в роли генерального подрядчика и проектировщика на российском рынке. Мы предоставляем комплексные услуги на всех этапах строительного процесса:
      </Paragraph>

      {/* Services Grid */}
      <style>{`
        .about-services-grid, .about-benefits-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        @media (max-width: 767px) {
          .about-services-grid, .about-benefits-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div className="about-services-grid">
        {services.map((service, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <img
              src={service.icon}
              alt={service.title}
              style={{ width: '48px', height: '48px', objectFit: 'contain', flexShrink: 0 }}
            />
            <div>
              <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', color: '#333', marginBottom: 0 }}>
                {service.title}
                {service.description && (
                  <>
                    {' — '}{service.description}
                  </>
                )}
              </Paragraph>
            </div>
          </div>
        ))}
      </div>

      {/* Final paragraph */}
      <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', marginTop: '48px', color: '#333' }}>
        Наш подход обеспечивает надежное выполнение всех задач, связанных со строительством, от начального планирования до окончательной реализации и гарантийного обслуживания.
      </Paragraph>

      {/* Benefits Title */}
      <Title level={3} style={{ marginBottom: '32px', color: '#1e3a5f', marginTop: '64px' }}>
        Ваша выгода от работы с нами:
      </Title>

      {/* Benefits Grid */}
      <div className="about-benefits-grid">
        {benefits.map((benefit, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <img
              src={benefit.icon}
              alt={benefit.title}
              style={{ width: '48px', height: '48px', objectFit: 'contain', flexShrink: 0 }}
            />
            <div>
              <Title level={4} style={{ marginBottom: '12px', color: '#1e3a5f', marginTop: 0 }}>
                {benefit.title}
              </Title>
              <Paragraph style={{ fontSize: '14px', lineHeight: '1.6', color: '#555', marginBottom: 0 }}>
                {benefit.description}
              </Paragraph>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
