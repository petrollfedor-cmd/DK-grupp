'use client';

import { useEffect, useState } from 'react';
import { Typography } from 'antd';
import Link from 'next/link';
import Hero from '@/components/Hero';
import AppBreadcrumb from '@/components/Breadcrumb';
import AppBreadcrumbs from '@/components/AppBreadcrumbs';
import ProjectCardExact from '@/components/ProjectCardExact';

const { Title } = Typography;

interface Project {
  id: number;
  image: string;
  icon: string;
  title: string;
  description: string;
  maxHeight: number;
}

interface HeroData {
  imageUrl: string;
  title: string;
  description: string;
  mainTitle: string;
}

interface FooterData {
  contacts: {
    phone: string;
    email: string;
    phoneHref: string;
    emailHref: string;
  };
  calculationSection: {
    title: string;
    description: string;
    getCalcButton: string;
    contactsButton: string;
    contactsHref: string;
  };
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  // Загрузка проектов из API
  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setProjects(data.data);
        }
      })
      .catch(err => console.error('Failed to load projects:', err));
  }, []);

  // Загрузка hero данных из API
  useEffect(() => {
    fetch('/api/hero')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setHeroData(data.data);
        }
      })
      .catch(err => console.error('Failed to load hero:', err));
  }, []);

  // Загрузка footer данных из API
  useEffect(() => {
    fetch('/api/footer')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setFooterData(data.data);
        }
      })
      .catch(err => console.error('Failed to load footer:', err));
  }, []);

  // Форматирование описания проекта
  const formatDescription = (desc: string) => {
    const items = desc.split(';').filter(s => s.trim());
    if (items.length === 0) return desc;
    
    return (
      <ul style={{ margin: 0, paddingLeft: '20px' }}>
        {items.map((item, idx) => {
          const parts = item.split('—').map(s => s.trim());
          return (
            <li key={idx} style={{ marginBottom: '4px' }}>
              {parts.length >= 2 ? (
                <>
                  <strong>{parts[0]}</strong> — {parts.slice(1).join('—').trim()}
                </>
              ) : (
                item.trim()
              )}
            </li>
          );
        })}
      </ul>
    );
  };

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
      <AppBreadcrumbs />

      <Hero
        imageUrl={heroData?.imageUrl}
        title={heroData?.title || ''}
        description={heroData?.description}
      />

      <div className="hero-main-title-wrapper">
        <h1 className="hero-main-title" style={{ fontSize: 'clamp(24px, 3vw, 32px)', marginTop: '20px', marginBottom: '20px' }}>
          {heroData?.mainTitle || 'СТРОИТЕЛЬНО-МОНТАЖНЫЕ РАБОТЫ РАЗЛИЧНЫХ ТИПОВ'}
        </h1>
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
          {projects.slice(0, showAllProjects ? undefined : 4).map((project) => (
            <ProjectCardExact
              key={project.id}
              image={project.image}
              icon={project.icon}
              title={project.title}
              description={formatDescription(project.description)}
              maxHeight={project.maxHeight}
            />
          ))}
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
          {footerData?.calculationSection?.title || 'Нужно рассчитать стоимость объекта?'}
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
          {footerData?.calculationSection?.description || 'Заполните форму и прикрепите файлы (фото, чертежи, спецификации) — мы подготовим расчёт'}
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
            {footerData?.calculationSection?.getCalcButton || 'Получить расчёт'}
          </button>
          <Link
            href={footerData?.calculationSection?.contactsHref || '/contacts'}
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
            {footerData?.calculationSection?.contactsButton || 'Контакты'}
          </Link>
        </div>
      </section>
    </main>
  );
}
