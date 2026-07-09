'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface ModalContextType {
  isModalOpen: boolean;
  openCalculationModal: () => void;
  closeCalculationModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openCalculationModal = useCallback(() => setIsOpen(true), []);
  const closeCalculationModal = useCallback(() => setIsOpen(false), []);

  return (
    <ModalContext.Provider value={{ isModalOpen: isOpen, openCalculationModal, closeCalculationModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
