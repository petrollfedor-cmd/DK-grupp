'use client';

import AppBreadcrumbs from '@/components/AppBreadcrumbs';

export default function FacadesPage() {
  return (
    <main className="facades-main" style={{ maxWidth: '100%', margin: '0 auto' }}>
      <style>{`
        @media (max-width: 1200px) {
          .f-hero { padding: 30px 40px 60px !important; }
          .f-categories, .f-solutions, .f-cta, .f-footer { padding-left: 40px !important; padding-right: 40px !important; }
        }
        @media (max-width: 768px) {
          .f-hero { padding: 20px 16px 40px !important; min-height: 50vh !important; }
          .f-hero__title { font-size: 24px !important; }
          .f-hero__description { font-size: 14px !important; }
          .f-hero__badge { font-size: 11px !important; padding: 6px 14px !important; margin-bottom: 16px !important; }
          .f-categories, .f-solutions, .f-cta, .f-footer { padding-left: 16px !important; padding-right: 16px !important; padding-top: 40px !important; padding-bottom: 40px !important; }
          .f-categories__title { font-size: 22px !important; }
          .f-categories__subtitle { font-size: 15px !important; }
          .f-categories__grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .f-category-card__overlay { padding: 16px 16px 16px !important; }
          .f-category-card__name { font-size: 18px !important; }
          .f-category-card__count { font-size: 13px !important; }
          .f-solutions__title { font-size: 22px !important; }
          .f-solutions__subtitle { font-size: 15px !important; }
          .f-solutions__grid { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
          .f-solution-item__name { font-size: 13px !important; padding: 12px 8px 14px !important; }
          .f-cta__title { font-size: 22px !important; }
          .f-cta__text { font-size: 15px !important; }
          .f-cta__button { padding: 14px 32px !important; font-size: 15px !important; }
          .f-footer { font-size: 12px !important; }
        }
        @media (max-width: 500px) {
          .f-solutions__grid { grid-template-columns: 1fr !important; max-width: 300px; margin: 0 auto !important; }
        }
      `}</style>

      <AppBreadcrumbs />

      {/* ===== HERO ===== */}
      <section className="f-hero" style={{
        position: 'relative',
        padding: '30px 142px 100px',
        background: 'linear-gradient(135deg, #e8edf2 0%, #d0d9e3 100%)',
        overflow: 'hidden',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'url("/figma/placeholder-hero.jpg") center/cover no-repeat',
          opacity: 0.35,
          zIndex: 0,
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span className="f-hero__badge" style={{
            display: 'inline-block',
            background: 'rgba(35, 54, 94, 0.12)',
            backdropFilter: 'blur(4px)',
            color: '#23365E',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            padding: '8px 20px',
            borderRadius: '50px',
            marginBottom: '24px',
          }}>
            Инновационные ограждающие конструкции
          </span>
          <h1 className="f-hero__title" style={{
            fontSize: 'clamp(36px, 5.5vw, 58px)',
            fontWeight: 700,
            lineHeight: '1.15',
            color: '#23365E',
            marginBottom: '24px',
            margin: '0 0 24px 0',
          }}>
            Фасадные светопрозрачные системы для решения комплексных задач
          </h1>
          <div className="f-hero__description" style={{
            fontSize: '18px',
            lineHeight: '1.7',
            color: '#555',
          }}>
            <p style={{ marginBottom: '16px' }}>
              Изменение климата, дефицит ресурсов, урбанизация и нехватка жилого пространства —
              эти серьезные вызовы меняют наш мир, а также сферу строительства и недвижимости.
              Мы разрабатываем продукцию, которая помогает возводить по всему миру впечатляющие
              здания, отвечающие требованиям будущего — с комплексной поддержкой на протяжении
              всего срока их службы.
            </p>
            <p>
              Мы поддерживаем процесс строительства, начиная от первой идеи и реализации
              и заканчивая стадией эксплуатации. В интересах индустрии, которая гармонично
              объединяет декарбонизацию и сохранение ресурсов с сохранением стоимости.
            </p>
          </div>
        </div>
      </section>

      {/* ===== КАТЕГОРИИ ===== */}
      <section className="f-categories" style={{ padding: '80px 142px', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 className="f-categories__title" style={{
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            fontWeight: 700,
            color: '#23365E',
            marginBottom: '12px',
            margin: '0 0 12px 0',
          }}>
            Продукция для реализации любых строительных проектов
          </h2>
          <p className="f-categories__subtitle" style={{
            fontSize: '18px',
            color: '#555',
            maxWidth: '100%',
            margin: '0 auto',
          }}>
            Современные ограждающие конструкции, удовлетворяющие сложные требования «из одного источника»
          </p>
        </div>
        <div className="f-categories__grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
        }}>
          {/* Окна */}
          <div className="f-category-card" style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            aspectRatio: '4 / 3',
            cursor: 'default',
            background: '#f4f7fa',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)';
            e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
          }}>
            <img src="/figma/fenster.webp" alt="Окна" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)', display: 'block' }} />
            <div className="f-category-card__overlay" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 24px 24px', background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7) 60%)', color: '#fff', transition: 'padding 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
              <div className="f-category-card__name" style={{ fontSize: '22px', fontWeight: 700, marginBottom: '4px' }}>Окна</div>
              <div className="f-category-card__count" style={{ fontSize: '14px', opacity: 0.8 }}>Энергоэффективные системы</div>
            </div>
          </div>
          {/* Двери */}
          <div className="f-category-card" style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            aspectRatio: '4 / 3',
            cursor: 'default',
            background: '#f4f7fa',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)';
            e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
          }}>
            <img src="/figma/tueren.webp" alt="Двери" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)', display: 'block' }} />
            <div className="f-category-card__overlay" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 24px 24px', background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7) 60%)', color: '#fff', transition: 'padding 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
              <div className="f-category-card__name" style={{ fontSize: '22px', fontWeight: 700, marginBottom: '4px' }}>Двери</div>
              <div className="f-category-card__count" style={{ fontSize: '14px', opacity: 0.8 }}>Входные и внутренние решения</div>
            </div>
          </div>
          {/* Раздвижные двери */}
          <div className="f-category-card" style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            aspectRatio: '4 / 3',
            cursor: 'default',
            background: '#f4f7fa',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)';
            e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
          }}>
            <img src="/figma/schiebe.webp" alt="Раздвижные двери" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)', display: 'block' }} />
            <div className="f-category-card__overlay" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 24px 24px', background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7) 60%)', color: '#fff', transition: 'padding 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
              <div className="f-category-card__name" style={{ fontSize: '22px', fontWeight: 700, marginBottom: '4px' }}>Раздвижные двери</div>
              <div className="f-category-card__count" style={{ fontSize: '14px', opacity: 0.8 }}>Максимальная свобода пространства</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== РЕШЕНИЯ ===== */}
      <section className="f-solutions" style={{ padding: '80px 142px', background: '#f4f7fa', borderTop: '1px solid #e0e4e8', borderBottom: '1px solid #e0e4e8' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 className="f-solutions__title" style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 700, color: '#23365E', marginBottom: '8px', margin: '0 0 8px 0' }}>Полный спектр фасадных решений</h2>
          <p className="f-solutions__subtitle" style={{ fontSize: '17px', color: '#555' }}>От огнестойкости до встраиваемой фотоэлектрики</p>
        </div>
        <div className="f-solutions__grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
          {[
            { name: 'Фасады', img: '/figma/fassaden.webp' },
            { name: 'Огнестойкость и дымозащита', img: '/figma/brandschutz.webp' },
            { name: 'Безопасность', img: '/figma/sicherheit.webp' },
            { name: 'Автоматизация зданий', img: '/figma/smart-home.webp' },
            { name: 'Вентиляция', img: '/figma/lueftung.webp' },
            { name: 'Солнцезащита', img: '/figma/sonnenschutz.webp' },
            { name: 'Обработка поверхности', img: '/figma/oberflaechen.webp' },
            { name: 'Встраиваемые фотоэлектрические системы', img: '/figma/bipv.webp' },
          ].map((item, idx) => (
            <div key={idx} className="f-solution-item" style={{
              background: '#fff',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              textAlign: 'center',
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.10)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.05)'; }}>
              <img src={item.img} alt={item.name} className="f-solution-item__image" style={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', display: 'block' }} />
              <div className="f-solution-item__name" style={{ padding: '16px 12px 18px', fontWeight: 600, fontSize: '15px', color: '#23365E', borderTop: '1px solid #e0e4e8', margin: 0 }}>{item.name}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
