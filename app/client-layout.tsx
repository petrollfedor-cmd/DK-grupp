'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Layout } from 'antd';
import { ModalProvider, useModal } from '@/app/ModalContext';
import AppHeader from '@/components/Header';
import AppFooter from '@/components/Footer';
import CalculationModal from '@/components/CalculationModal';
import RequisitesModal from '@/components/RequisitesModal';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isModalOpen, openCalculationModal, closeCalculationModal } = useModal();
  const [isRequisitesOpen, setIsRequisitesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [pathname]);

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppHeader onOpenModal={openCalculationModal} />
      <Layout.Content style={{ flex: 1 }}>
        {children}
      </Layout.Content>
      <AppFooter onOpenRequisites={() => setIsRequisitesOpen(true)} />
      <CalculationModal isOpen={isModalOpen} onClose={closeCalculationModal} />
      <RequisitesModal isOpen={isRequisitesOpen} onClose={() => setIsRequisitesOpen(false)} />
    </Layout>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <LayoutContent children={children} />
    </ModalProvider>
  );
}
