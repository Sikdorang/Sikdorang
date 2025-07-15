'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

interface WarningModalContextType {
  isOpen: boolean;
  message: string;
  openModal: (message: string) => void;
  closeModal: () => void;
  confirmWarning: (onConfirm: () => void) => void;
}

const WarningModalContext = createContext<WarningModalContextType | undefined>(
  undefined,
);

export function WarningModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openModal = (msg: string) => {
    setMessage(msg);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setMessage('');
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
