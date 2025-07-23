'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface WarningModalContextType {
  isOpen: boolean;
  message: number;
  openModal: (message: string) => void;
  closeModal: () => void;
  confirmWarning: (onConfirm: () => void) => void;
}

const WarningModalContext = createContext<WarningModalContextType | undefined>(
  undefined,
);

export function WarningModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(0);

  const openModal = (msg: string) => {
    setMessage(msg as unknown as number);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setMessage(0);
  };
  const confirmWarning = (onConfirm: () => void) => {
    onConfirm();
    closeModal();
  };

  return (
    <WarningModalContext.Provider
      value={{ isOpen, message, openModal, closeModal, confirmWarning }}
    >
      {children}
    </WarningModalContext.Provider>
  );
}

export function useWarningModal() {
  const ctx = useContext(WarningModalContext);
  if (!ctx)
    throw new Error('useWarningModal must be used within WarningModalProvider');
  return ctx;
}
