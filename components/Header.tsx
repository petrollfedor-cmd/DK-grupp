'use client';

import { useState, useEffect, useRef } from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import NextImage from 'next/image';
import { usePathname } from 'next/navigation';

const { Header } = Layout;

const headerMenuItems = [
  { label: 'Главная', key: 'main', href: '/#hero' },
  { label: 'Проекты', key: 'projects', href: '/#projects' },
  { label: 'Типы работ', key: 'types', href: '/types-works' },
  { label: 'О компании', key: 'about', href: '/about' },
  { label: 'Скачать презентацию', key: 'presentation', href: '/contacts' },
  { label: 'Контакты', key: 'contacts', href: '/contacts' },
];

interface AppHeaderProps {
  onOpenModal?: () => void;
}

export default function AppHeader({ onOpenModal }: AppHeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const handleMenuClick = (href: string) => {
    setIsMenuOpen(false);
    window.location.href = href;
  };

  const getSelectedKey = () => {
    if (pathname === '/types-works') return 'types';
    if (pathname?.startsWith('/projects')) return 'projects';
    if (pathname === '/about') return 'about';
    if (pathname === '/contacts') return 'contacts';
    return 'main';
  };

  const headerStyle: React.CSSProperties = {
    background: 'linear-gradient(to right, #1e3a5f 0%, #1e3a5f 60%, #c0c0c0 85%, #8a8a8a 100%)',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '36px',
    minHeight: '36px',
    border: 'none',
    position: 'relative',
    zIndex: 100,
  };

  const headerLeftStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginLeft: '16px',
    height: '36px',
  };

  const menuInlineStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '36px',
    minHeight: '36px',
    display: 'flex',
    margin: 0,
    padding: '0 0 0 142px',
  };

  const menuItemInlineStyle: React.CSSProperties = {
    fontFamily: 'Lato, sans-serif',
    fontWeight: 600,
    fontSize: '18px',
    color: '#fff',
    height: '36px',
    minHeight: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 16px',
    margin: 0,
    border: 'none',
    lineHeight: '1',
  };

  const headerRightStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginRight: '16px',
    height: '36px',
  };

  const actionButtonStyle: React.CSSProperties = {
    background: '#fff',
    color: '#1e3a5f',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '13px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
  };

  // Бургер-иконка
  const BurgerIcon = () => (
    <svg
      width="24"
      height="18"
      viewBox="0 0 24 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: 'pointer', display: 'block' }}
    >
      <rect y="0" width="24" height="2" rx="1" fill="#fff" />
      <rect y="8" width="24" height="2" rx="1" fill="#fff" />
      <rect y="16" width="24" height="2" rx="1" fill="#fff" />
    </svg>
  );

  return (
    <>
      <style>{`
        .nav-menu-item:hover {
          background: rgba(255, 255, 255, 0.15) !important;
          border-radius: 4px;
          transition: background 0.2s ease;
        }
        .nav-menu-item:hover a {
          color: #ffffff !important;
        }
        .mobile-menu-container {
          position: absolute;
          top: 52px;
          left: 0;
          right: 0;
          background: #1e3a5f;
          z-index: 999;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        .mobile-menu-container.open {
          max-height: 400px;
        }
        .mobile-menu-item {
          padding: 16px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .mobile-menu-item a {
          color: #fff !important;
          text-decoration: none !important;
          font-family: 'Lato', sans-serif !important;
          font-size: 16px !important;
          font-weight: 600 !important;
          display: block;
        }
        .mobile-menu-item a:hover {
          color: #ffd388 !important;
        }
        /* Скрытие/показ через CSS */
        @media (min-width: 768px) {
          .mobile-header {
            display: none !important;
          }
          .mobile-menu-container {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .desktop-header-wrapper {
            display: none !important;
          }
        }
      `}</style>

      {/* Desktop Header - всегда рендерится, но скрывается на мобильных через CSS */}
      <div className="desktop-header-wrapper">
        <Header style={headerStyle}>
          <div style={headerLeftStyle}>
            <div className="site-avatar" />
          </div>

          <Menu
            theme="dark"
            mode="horizontal"
            items={headerMenuItems.map((item) => ({
              key: item.key,
              style: menuItemInlineStyle,
              className: 'nav-menu-item',
              label: (
                <a href={item.href} style={{ color: '#fff', textDecoration: 'none', lineHeight: '1', display: 'flex', alignItems: 'center' }}>
                  {item.label}
                </a>
              ),
            }))}
            style={menuInlineStyle}
            selectedKeys={[getSelectedKey()]}
          />

          <div style={headerRightStyle}>
            <button style={actionButtonStyle} onClick={onOpenModal}>Заказать расчет</button>
            <div className="site-avatar" />
          </div>
        </Header>
      </div>

      {/* Mobile Header - всегда рендерится, но скрывается на десктопе через CSS */}
      <div
        className="mobile-header"
        style={{
          display: 'flex',
          background: 'linear-gradient(to right, #1e3a5f 0%, #1e3a5f 60%, #c0c0c0 85%, #8a8a8a 100%)',
          padding: '8px 16px',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '52px',
          position: 'relative',
          zIndex: 100,
        }}
      >
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            background: 'transparent',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '14px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
            fontFamily: 'Lato, sans-serif',
          }}
        >
          Навигация
        </button>
        <button
          onClick={() => {
            onOpenModal?.();
            setIsMenuOpen(false);
          }}
          style={{
            background: '#fff',
            color: '#1e3a5f',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '13px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
          }}
        >
          Заказать расчет
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu-container ${isMenuOpen ? 'open' : ''}`}>
        {headerMenuItems.map((item) => (
          <div key={item.key} className="mobile-menu-item">
            <a onClick={() => handleMenuClick(item.href)}>
              {item.label}
            </a>
          </div>
        ))}
      </div>

    </>
  );
}
