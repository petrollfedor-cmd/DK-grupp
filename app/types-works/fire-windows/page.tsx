'use client';

import { Typography } from 'antd';
import Link from 'next/link';
import AppBreadcrumbs from '@/components/AppBreadcrumbs';

const { Title, Paragraph } = Typography;

export default function FireWindowsPage() {
  const services = [
    {
      image: '/figma/3d-proektirovanie-x-9e2.jpg',
      badge: '🔥 Пожарная безопасность',
      title: 'Противопожарные окна и витражи',
      text: 'Алюминиевые витражи со светопрозрачными заполнениями с пределом огнестойкости EI 30, EI 60, EI 90 для наружных фасадов и внутренних перегородок.',
      details: { time: 'EI 30–90', note: 'для фасадов и интерьеров' },
    },
    {
      image: '/figma/pozharnaya-bezopasnost.webp',
      title: 'Противопожарные фасады',
      text: 'Самонесущие и навесные противопожарные фасадные системы с пределом огнестойкости до EI9 90. Работаем с объектами любой сложности.',
      details: { time: 'до EI9 90', note: 'наружные фасады' },
    },
    {
      image: '/figma/89199399_i.png',
      title: 'Противопожарные остекленные двери',
      text: 'Остекленные двери с пределом огнестойкости E 30, E 60. Изготовление по индивидуальным размерам с монтажом «под ключ».',
      details: { time: 'E 30–60', note: 'изготовление и монтаж' },
    },
    {
      image: '/figma/4.-protivopozharnye-vitrazhi.png',
      badge: '📐 Проектирование',
      title: '3D-визуализация конструкций',
      text: 'Трёхмерные модели противопожарных систем с привязкой к реальному объекту. Помогаем принять решение до начала производства.',
      details: { time: 'от 3 дней', note: 'для своих и сторонних изделий' },
    },
    {
      image: '/figma/ventilyaciya-dymoudalenie-x-ddc.jpg',
      title: 'Вентиляция и дымоудаление',
      text: 'Интеграция систем вентиляции и дымоудаления в противопожарные фасадные конструкции с сохранением эстетики и функциональности.',
      details: { time: '10 лет опыта', note: 'типовые и уникальные здания' },
    },
    {
      image: '/figma/daop-eiws60-x-049.jpg',
      badge: '🛡️ Комплекс',
      title: 'Системы пожаротушения',
      text: 'Проектирование и внедрение систем пожаротушения с любым типом огнетушащего вещества. Адаптация под светопрозрачные фасады.',
      details: { time: 'с 1996 года', note: 'полный комплекс работ' },
    },
  ];

  const advantages = [
    { icon: '🛡️', title: 'Европейские стандарты', text: 'Опираемся на EN и ГОСТ, используем проверенные материалы и комплектующие.' },
    { icon: '🔑', title: 'Под ключ', text: 'Полный цикл: проектирование, поставка, монтаж, пуско-наладка и сервис.' },
    { icon: '📄', title: 'Разрешительная документация', text: 'Все работы сопровождаются сертификатами и согласованиями.' },
    { icon: '🏗️', title: 'Опыт на сложных объектах', text: 'Более 500 проектов для ЖК, административных зданий и памятников архитектуры.' },
  ];

  return (
    <main style={{ fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <style>{`
        @media (max-width: 992px) {
          .fw-about-grid {
            grid-template-columns: 1fr !important;
          }
          .fw-about-image {
            order: -1 !important;
          }
        }
        @media (max-width: 768px) {
          .fw-breadcrumbs-wrapper {
            padding: 12px 16px 0 !important;
          }
          .fw-hero {
            padding: 32px 0 24px !important;
          }
          .fw-hero__title {
            font-size: 22px !important;
            margin-bottom: 12px !important;
          }
          .fw-hero__description {
            padding: 0 16px !important;
          }
          .fw-hero__description p {
            font-size: 14px !important;
            line-height: 1.5 !important;
            margin-bottom: 10px !important;
          }
          .fw-advantages-section {
            padding: 24px 0 !important;
          }
          .fw-advantages-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            padding: 0 16px !important;
          }
          .fw-advantage-item {
            padding: 16px 12px !important;
          }
          .fw-advantage-icon {
            font-size: 28px !important;
            margin-bottom: 8px !important;
          }
          .fw-advantage-title {
            font-size: 15px !important;
            margin-bottom: 4px !important;
          }
          .fw-advantage-text {
            font-size: 13px !important;
          }
          .fw-services-section {
            padding: 24px 0 !important;
          }
          .fw-services-header {
            padding: 0 16px !important;
            margin-bottom: 20px !important;
          }
          .fw-services-title {
            font-size: 22px !important;
          }
          .fw-services-subtitle {
            font-size: 14px !important;
          }
          .fw-services-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            padding: 0 16px !important;
          }
          .fw-service-card {
            border-radius: 12px !important;
          }
          .fw-service-content {
            padding: 16px !important;
          }
          .fw-service-badge {
            font-size: 10px !important;
            padding: 3px 10px !important;
            margin-bottom: 8px !important;
          }
          .fw-service-name {
            font-size: 17px !important;
            margin-bottom: 8px !important;
          }
          .fw-service-text {
            font-size: 14px !important;
            margin-bottom: 12px !important;
          }
          .fw-service-details {
            font-size: 12px !important;
            padding-top: 12px !important;
          }
          .fw-service-details span {
            margin-right: 12px !important;
          }
          .fw-service-details i {
            font-size: 11px !important;
            padding: 2px 8px !important;
          }
          .fw-about-section {
            padding: 24px 0 !important;
          }
          .fw-about-grid {
            gap: 24px !important;
          }
          .fw-about-content {
            padding: 0 16px !important;
          }
          .fw-about-title {
            font-size: 22px !important;
            margin-bottom: 12px !important;
          }
          .fw-about-text {
            font-size: 14px !important;
            line-height: 1.5 !important;
            margin-bottom: 12px !important;
          }
          .fw-about-list li {
            font-size: 14px !important;
            padding: 6px 0 6px 28px !important;
          }
          .fw-about-image {
            margin: 0 16px !important;
            min-height: 180px !important;
          }
        }
        @media (hover: none) and (pointer: coarse) {
          .fw-advantage-item,
          .fw-service-card {
            transition: none !important;
          }
          .fw-advantage-item:hover,
          .fw-service-card:hover {
            transform: none !important;
            box-shadow: inherit !important;
          }
        }
      `}</style>

      {/* Хлебные крошки */}
      <div className="fw-breadcrumbs-wrapper" style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 24px 0' }}>
        <AppBreadcrumbs />
      </div>

      {/* БЛОК 1: ГЕРОЙ */}
      <section className="fw-hero" style={{
        padding: '50px 0 40px',
        background: 'linear-gradient(135deg, #eef2f7 0%, #d9e2ec 100%)',
        borderBottom: '1px solid #e0e4e8',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <Title level={2} className="fw-hero__title" style={{
            fontSize: 'clamp(24px, 4vw, 36px)',
            fontWeight: 700,
            color: '#1a3a5c',
            marginBottom: '16px',
            marginTop: 0,
            lineHeight: '1.2',
          }}>
            Комплексные услуги по светопрозрачным и противопожарным фасадным системам
          </Title>
          <div className="fw-hero__description" style={{ maxWidth: '850px' }}>
            <Paragraph style={{
              fontSize: 'clamp(14px, 2vw, 16px)',
              color: '#555',
              lineHeight: '1.6',
              marginBottom: '12px',
            }}>
              <strong style={{ color: '#1a3a5c' }}>Более 12 лет</strong> мы сопровождаем проекты любой сложности: от разработки концепции до ввода в эксплуатацию. Помимо собственного производства, мы предлагаем полный спектр инженерных решений для фасадов, включая системы пожарной безопасности, вентиляции и автоматизации.
            </Paragraph>
            <Paragraph style={{
              fontSize: 'clamp(14px, 2vw, 16px)',
              color: '#555',
              lineHeight: '1.6',
              marginBottom: 0,
            }}>
              Наши специалисты выполняют <strong style={{ color: '#1a3a5c' }}>3D-визуализацию</strong> будущих конструкций, помогая увидеть проект в деталях ещё до начала монтажа. Работаем с объектами культурного наследия, жилыми комплексами и деловыми центрами — всегда с учётом архитектурного контекста и требований надзорных органов.
            </Paragraph>
          </div>
        </div>
      </section>

      {/* БЛОК 2: ПРЕИМУЩЕСТВА */}
      <section className="fw-advantages-section" style={{ padding: '40px 0', background: '#fff', borderBottom: '1px solid #e0e4e8' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div className="fw-advantages-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
          }}>
            {advantages.map((adv, idx) => (
              <div key={idx} className="fw-advantage-item" style={{
                textAlign: 'center',
                padding: '20px 16px',
                borderRadius: '12px',
                background: '#f4f7fa',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div className="fw-advantage-icon" style={{ fontSize: '32px', marginBottom: '10px' }}>{adv.icon}</div>
                <div className="fw-advantage-title" style={{ fontSize: '16px', fontWeight: 600, color: '#1a3a5c', marginBottom: '4px' }}>
                  {adv.title}
                </div>
                <div className="fw-advantage-text" style={{ fontSize: '13px', color: '#555', lineHeight: '1.4' }}>
                  {adv.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* БЛОК 3: УСЛУГИ */}
      <section className="fw-services-section" style={{ padding: '40px 0', background: '#f4f7fa' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div className="fw-services-header" style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Title level={3} className="fw-services-title" style={{
              fontSize: 'clamp(22px, 3vw, 32px)',
              fontWeight: 700,
              color: '#1a3a5c',
              marginBottom: '6px',
              marginTop: 0,
            }}>
              Выберите услугу
            </Title>
            <Paragraph className="fw-services-subtitle" style={{
              fontSize: '15px',
              color: '#555',
              marginBottom: 0,
            }}>
              Адаптируем решения под ваш объект и бюджет
            </Paragraph>
          </div>
          <div className="fw-services-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {services.map((service, idx) => (
              <div key={idx} className="fw-service-card" style={{
                background: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
              }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    objectFit: 'cover',
                    display: 'block',
                    background: '#d0d9e3',
                  }}
                />
                <div className="fw-service-content" style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {service.badge && (
                    <span className="fw-service-badge" style={{
                      display: 'inline-block',
                      background: '#c0392b',
                      color: '#fff',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      padding: '3px 10px',
                      borderRadius: '50px',
                      alignSelf: 'flex-start',
                      marginBottom: '10px',
                    }}>
                      {service.badge}
                    </span>
                  )}
                  <h3 className="fw-service-name" style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#1a3a5c',
                    marginBottom: '8px',
                    marginTop: 0,
                    lineHeight: '1.3',
                  }}>
                    {service.title}
                  </h3>
                  <p className="fw-service-text" style={{
                    fontSize: '14px',
                    color: '#555',
                    lineHeight: '1.5',
                    flex: 1,
                    marginBottom: '14px',
                  }}>
                    {service.text}
                  </p>
                  <div className="fw-service-details" style={{
                    fontSize: '13px',
                    color: '#1a3a5c',
                    fontWeight: 500,
                    borderTop: '1px solid #e0e4e8',
                    paddingTop: '12px',
                    marginTop: 'auto',
                  }}>
                    <span style={{ display: 'inline-block', marginRight: '16px' }}>
                      {service.details.time}
                    </span>
                    <span style={{
                      fontStyle: 'normal',
                      background: '#f4f7fa',
                      padding: '2px 8px',
                      borderRadius: '16px',
                      fontSize: '12px',
                    }}>
                      {service.details.note}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* БЛОК 4: О КОМПАНИИ */}
      <section className="fw-about-section" style={{ padding: '40px 0', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div className="fw-about-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            alignItems: 'center',
          }}>
            <div className="fw-about-content">
              <Title level={3} className="fw-about-title" style={{
                fontSize: 'clamp(20px, 3vw, 30px)',
                fontWeight: 700,
                color: '#1a3a5c',
                marginBottom: '14px',
                marginTop: 0,
                lineHeight: '1.3',
              }}>
                Почему нам доверяют сложные объекты
              </Title>
              <Paragraph className="fw-about-text" style={{
                fontSize: '15px',
                color: '#555',
                lineHeight: '1.6',
                marginBottom: '14px',
              }}>
                Наша производственно-складская база расположена в Санкт-Петербурге, что ускоряет логистику и снижает бюджет для заказчиков из Северо-Западного региона. Мы используем материалы ведущих российских и европейских марок, а каждый этап работ документируем и согласовываем с надзорными органами.
              </Paragraph>
              <ul className="fw-about-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  { text: '<strong>Собственное производство</strong> — контроль качества на всех этапах.' },
                  { text: '<strong>Портфолио</strong> — объекты культурного наследия, ЖК премиум-класса, административные центры.' },
                  { text: '<strong>Команда</strong> — аттестованные инженеры-проектировщики и монтажные бригады.' },
                  { text: '<strong>Гарантия</strong> — на все виды работ до 5 лет.' },
                ].map((item, idx) => (
                  <li key={idx} style={{
                    padding: '6px 0 6px 28px',
                    background: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%231a3a5c\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"></polyline></svg>') left center no-repeat",
                    backgroundSize: '18px',
                    color: '#2d2d2d',
                    fontSize: '15px',
                    lineHeight: '1.4',
                  }}
                  dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                ))}
              </ul>
            </div>
            <div className="fw-about-image" style={{
              background: '#d0d9e3',
              borderRadius: '12px',
              aspectRatio: '4/3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage: "url('/figma/brandschutz.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '220px',
              margin: '0 24px',
            }} />
          </div>
        </div>
      </section>
    </main>
  );
}
