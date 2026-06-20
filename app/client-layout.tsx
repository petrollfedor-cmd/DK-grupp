'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Layout } from 'antd';
import AppHeader from '@/components/Header';
import AppFooter from '@/components/Footer';
import CalculationModal from '@/components/CalculationModal';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (window.location.hash) {
      // Browser handles hash scroll automatically
      return;
    }
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [pathname]);

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppHeader onOpenModal={() => setIsModalOpen(true)} />
      <Layout.Content style={{ flex: 1 }}>
        {children}
      </Layout.Content>
      <AppFooter />
      <CalculationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Layout>
  );
}
