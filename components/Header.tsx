'use client';

import { Layout, Menu } from 'antd';
import Link from 'next/link';
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
  
  const getSelectedKey = () => {
    if (pathname === '/types-works') return 'types';
    if (pathname?.startsWith('/projects')) return 'projects';
    if (pathname === '/about') return 'about';
    if (pathname === '/contacts') return 'contacts';
    return 'main';
  };

  const isHomePage = pathname === '/';

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

  return (
    <>
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

      {isHomePage && (
        <>
          <div className="site-logo-container">
            <Link href="/" className="site-logo-link">
              <img
                className="site-logo-full"
                src="/figma/2:5.png"
                alt="Логотип"
              />
            </Link>
          </div>

          <div className="site-contacts-bar">
            <a href="mailto:DK-Group1@yandex.ru" className="site-contact-email">DK-Group1@yandex.ru</a>
            <a href="tel:+79119994995" className="site-contact-phone">+7 (911) 999-49-95</a>
          </div>
        </>
      )}
    </>
  );
}
