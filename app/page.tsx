'use client';

import { useEffect, useState } from 'react';
import { Typography } from 'antd';
import Link from 'next/link';
import Hero from '@/components/Hero';
import AppBreadcrumb from '@/components/Breadcrumb';
import ProjectCardExact from '@/components/ProjectCardExact';

const { Title } = Typography;

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    const sections = [
      { id: 'projects', title: 'Проекты' },
      { id: 'contacts', title: 'Контакты' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) {
          setActiveSection(null);
          return;
        }

        const topMost = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        const section = sections.find((item) => item.id === topMost.target.id);
        setActiveSection(section?.title ?? null);
      },
      {
        root: null,
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0.1,
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <AppBreadcrumb
        items={
          activeSection
            ? [
                { title: 'Главная', href: '/' },
                { title: activeSection },
              ]
            : [{ title: 'Главная' }]
        }
      />

      <Hero
        imageUrl="/figma/265:278.png"
        title="СТРОИТЕЛЬНО-МОНТАЖНЫЕ РАБОТЫ РАЗЛИЧНЫХ ТИПОВ"
        description="Фасадные работы всех типов: проектирование, остекление, инженерная документация"
      />

      <div className="hero-main-title-wrapper">
        <h1 className="hero-main-title" style={{ fontSize: 'clamp(24px, 3vw, 32px)', marginTop: '20px', marginBottom: '20px' }}>СТРОИТЕЛЬНО-МОНТАЖНЫЕ РАБОТЫ РАЗЛИЧНЫХ ТИПОВ</h1>
      </div>

      <section id="projects" style={{ padding: '20px 60px', maxWidth: '1920px', margin: '0 auto' }}>
        {/* Заголовок секции + кнопка "Все проекты" */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <h2
            style={{
              margin: 0,
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(22px, 3vw, 28px)',
              lineHeight: '1.2',
              color: '#23365E',
            }}
          >
            Реализованные проекты:
          </h2>
        </div>

        {/* Сетка проектов 2x2 - компактная */}
        <div
          className={`projects-grid${showAllProjects ? ' show-more' : ''}`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            justifyContent: 'start',
          }}
        >
          {/* Карточка 1: Аэропорт Гагарин */}
          <ProjectCardExact
            image="/figma/88:69.png"
            icon="/figma/88:69.png"
            title="Аэропорт Гагарин г. Саратов"
            description={
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li><strong>Проектирование</strong> — разработка рабочей документации, расчет нагрузок, оптимизация раскроя материала;</li>
                <li><strong>Поставка материалов</strong> — эмалит, несущие профили, крепежные элементы, уплотнители (полная комплектация);</li>
                <li><strong>Монтаж несущих конструкций</strong> — установка каркаса под остекление с контролем геометрии;</li>
                <li><strong>Остекление</strong> — монтаж панелей эмалита площадью 2100 м² с соблюдением технологии;</li>
                <li><strong>Герметизация и отделка</strong> — обработка швов, установка отливов, финишная доводка;</li>
              </ul>
            }
            maxHeight={280}
          />

          {/* Карточка 2: Новый комплекс ИКБ №1 */}
          <ProjectCardExact
            image="/figma/161:32.png"
            icon="/figma/161:32.png"
            title="Новый комплекс ИКБ №1"
            description={
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li><strong>Проектирование</strong> — разработка полного пакета документации с учетом всех нагрузок и норм;</li>
                <li><strong>Поставка</strong> — комплектация материалами под ключ (стекло, профили, крепеж, уплотнители);</li>
                <li><strong>Монтаж</strong> — установка внутренних светопрозрачных конструкций — 150 м²;</li>
                <li><strong>Монтаж</strong> — фасадных противопожарных входных групп — 1750 м²;</li>
              </ul>
            }
            maxHeight={280}
          />

          {/* Карточка 3: МГУ кластер Ломоносов */}
          <ProjectCardExact
            image="/figma/6:15.png"
            icon="/figma/6:15.png"
            title="МГУ кластер Ломоносов"
            description={
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li>облицовка 62 колонн эмалитом (высотой до 18 м) — 1360 м²;</li>
                <li>стеклянные ограждения (прямые участки) — 2300 пог. м;</li>
                <li>стеклянное ограждение винтовой лестницы — 157 пог. м.</li>
              </ul>
            }
            maxHeight={280}
          />

          {/* Карточка 4: Научный центр имени А.С. Логинова МКНЦ */}
          <ProjectCardExact
            image="/figma/88:70.png"
            icon="/figma/88:70.png"
            title="Научный центр имени А.С. Логинова МКНЦ"
            description={
              <>
                <p style={{ margin: '0 0 12px 0' }}>Проектирование и полный цикл работ по остеклению и реставрации:</p>
                <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px' }}>
                  <li>внутренние светопрозрачные конструкции — 350 м² (монтаж);</li>
                  <li>внутренние противопожарные светопрозрачные конструкции — 150 м² (монтаж);</li>
                  <li>фасадная стоечно-ригельная система — 3000 м² (реставрация).</li>
                </ul>
                <p style={{ margin: 0 }}>Включая все подготовительные, монтажные и отделочные этапы.</p>
              </>
            }
            maxHeight={280}
          />

          {/* Карточка 5: Показывается только при нажатии "Все проекты" */}
          {showAllProjects && (
            <>
              <ProjectCardExact
                image="/figma/223:15.png"
                icon="/figma/223:15.png"
                title="Центр Самбо и Бокса в Лужниках"
                description={
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    <li><strong>Проектирование полного цикла</strong> — разработка КМД (конструкций металлических), расчеты нагрузок, узлов крепления, раскладка элементов;</li>
                    <li><strong>Колонны (6 шт., высота до 18 м)</strong> — проектирование, поставка материалов и монтаж облицовки/остекления колонн с учетом сложной геометрии и высотных работ;</li>
                    <li><strong>Светопрозрачный потолок</strong> — проектирование, поставка и монтаж конструкций площадью 1780 м² (включая несущий каркас, заполнение, герметизацию);</li>
                    <li><strong>Сопровождение всех этапов</strong> — авторский надзор, контроль качества, решение технических вопросов на площадке, сдача объекта.</li>
                  </ul>
                }
                maxHeight={280}
              />

              {/* Карточка 6: Показывается только при нажатии "Все проекты" */}
              <ProjectCardExact
                image="/figma/227:89.png"
                icon="/figma/227:89.png"
                title="Флагманский центр ГКБ № 15 имени О.М. Филатова"
                description={
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    <li><strong>Проектирование</strong> — адаптация фасадных решений;</li>
                    <li><strong>Поставка</strong> — структурное остекление, алюминиевые конструкции;</li>
                    <li><strong>Монтаж</strong> — фасадное остекление 2800 м²;</li>
                  </ul>
                }
                maxHeight={280}
              />
            </>
          )}
        </div>

        {/* Кнопка "Все проекты" */}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button
            onClick={() => setShowAllProjects(!showAllProjects)}
            style={{
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: 'clamp(14px, 2vw, 16px)',
              color: '#23365E',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              opacity: 0.6,
              transition: 'opacity 0.2s',
              padding: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '0.6')}
          >
            {showAllProjects ? 'Скрыть' : 'Все проекты'} {showAllProjects ? '↑' : '↓'}
          </button>
        </div>
      </section>

      {/* Секция: Получить расчёт вашего объекта - Кнопка для модального окна */}
      <section id="calculation" style={{ padding: '60px 142px', maxWidth: '1920px', margin: '0 auto', textAlign: 'center' }}>
        <h2
          style={{
            margin: '0 0 32px 0',
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: 'clamp(28px, 3vw, 36px)',
            fontWeight: 600,
            color: '#23365E',
          }}
        >
          Нужно рассчитать стоимость объекта?
        </h2>
        <p
          style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '18px',
            color: '#666',
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px auto',
          }}
        >
          Заполните форму и прикрепите файлы (фото, чертежи, спецификации) — мы подготовим расчёт
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button
            onClick={() => document.querySelector<HTMLButtonElement>('.site-action-button')?.click()}
            style={{
              padding: '18px 48px',
              fontSize: '18px',
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 600,
              color: '#fff',
              backgroundColor: '#23365E',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(35, 54, 94, 0.3)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#1a2a4a';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(35, 54, 94, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#23365E';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(35, 54, 94, 0.3)';
            }}
          >
            Получить расчёт
          </button>
          <Link
            href="/contacts"
            style={{
              padding: '18px 48px',
              fontSize: '18px',
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 600,
              color: '#23365E',
              backgroundColor: '#fff',
              border: '2px solid #23365E',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#23365E';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#fff';
              e.currentTarget.style.color = '#23365E';
            }}
          >
            Контакты
          </Link>
        </div>
      </section>
    </main>
  );
}
