'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

interface EditModalContextType {
  isOpen: boolean;
  name: string;
  initialValue: string;
  openModal: (initialValue?: string) => void;
  closeModal: () => void;
  setName: (name: string) => void;
  saveEdit: (onSave: (name: string) => void) => void;
}

const EditModalContext = createContext<EditModalContextType | undefined>(
  undefined,
);

export function EditModalProvider({ children }: { children: ReactNode }) {
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
    <EditModalContext.Provider
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
    </EditModalContext.Provider>
  );
}

export function useEditModal() {
  const context = useContext(EditModalContext);
  if (!context) {
    throw new Error('useEditModal must be used within EditModalProvider');
  }
  return context;
}
