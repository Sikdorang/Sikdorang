'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

interface NameEditModalContextType {
  isOpen: boolean;
  name: string;
  initialValue: string;
  openModal: (initialValue?: string) => void;
  closeModal: () => void;
  setName: (name: string) => void;
  saveEdit: (onSave: (name: string) => void) => void;
}

const NameEditModalContext = createContext<
  NameEditModalContextType | undefined
>(undefined);

export function MenuModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [initialValue, setInitialValue] = useState('');

  const openModal = (initialValue = '') => {
    setInitialValue(initialValue);
    setName(initialValue);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setName('');
    setInitialValue('');
  };

  const saveEdit = (onSave: (name: string) => void) => {
    if (name.trim()) {
      onSave(name.trim());
      closeModal();
    }
  };

  return (
    <NameEditModalContext.Provider
      value={{
        isOpen,
        name,
        initialValue,
        openModal,
        closeModal,
        setName,
        saveEdit,
      }}
    >
      {children}
    </NameEditModalContext.Provider>
  );
}

export function useEditModal() {
  const context = useContext(NameEditModalContext);
  if (!context) {
    throw new Error('useMenuModal must be used within MenuModalProvider');
  }
  return context;
}
