'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  key: string;
  label: string;
  href: string;
}

export default function AppBreadcrumbs() {
  const pathname = usePathname();
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<{ title: string; href?: string }[]>([]);

  useEffect(() => {
    const loadNavigation = () => {
      fetch('/api/navigation')
        .then(res => res.json())
        .then(data => {
          if (data.success && Array.isArray(data.data)) {
            setNavItems(data.data);
          }
        })
        .catch(err => console.error('Failed to load navigation:', err));
    };

    loadNavigation();
    // Обновляем навигацию каждые 5 секунд
    const interval = setInterval(loadNavigation, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (navItems.length === 0) return;

    // Определяем текущую страницу по pathname
    let currentNav: NavItem | undefined;

    if (pathname === '/') {
      currentNav = navItems.find(item => item.key === 'main');
    } else if (pathname === '/types-works') {
      currentNav = navItems.find(item => item.key === 'types');
    } else if (pathname?.startsWith('/types-works/')) {
      // Для вложенных страниц types-works показываем "Типы работ"
      currentNav = navItems.find(item => item.key === 'types');
    } else if (pathname === '/projects') {
      currentNav = navItems.find(item => item.key === 'projects');
    } else if (pathname === '/about') {
      currentNav = navItems.find(item => item.key === 'about');
    } else if (pathname === '/contacts') {
      currentNav = navItems.find(item => item.key === 'contacts');
    }

    if (currentNav) {
      setBreadcrumbs([
        { title: 'Главная', href: '/' },
        { title: currentNav.label, href: currentNav.href },
      ]);
    } else {
      setBreadcrumbs([{ title: 'Главная', href: '/' }]);
    }
  }, [navItems, pathname]);

  if (breadcrumbs.length === 0) return null;

  return (
    <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
      {breadcrumbs.map((crumb, idx) => (
        <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {idx > 0 && <span style={{ color: '#23365E', opacity: 0.5 }}>/</span>}
          {crumb.href ? (
            <Link href={crumb.href} style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', color: '#23365E', textDecoration: 'none' }}>
              {crumb.title}
            </Link>
          ) : (
            <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', color: '#23365E', opacity: 0.6 }}>
              {crumb.title}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
