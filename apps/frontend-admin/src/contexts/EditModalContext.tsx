'use client';

import { EditModalFormData } from '@/types/request/modal';
import { createContext, ReactNode, useContext, useState } from 'react';

interface EditModalContextType {
  // 모달 상태 관리
  currentModal: ModalType | null;
  isOpen: boolean;

  // 폼 데이터 관리
  formData: EditModalFormData;

  // 메서드들
  openModal: (
    type: ModalType,
    initialData?: Partial<EditModalFormData>,
  ) => void;
  closeModal: () => void;

  // 개별 필드 업데이트
  updateField: <K extends keyof EditModalFormData>(
    field: K,
    value: EditModalFormData[K],
  ) => void;

  // 토글 상태 관리
  updateToggleState: (key: string, value: boolean) => void;

  // 저장
  saveEdit: (onSave: (data: EditModalFormData) => void) => void;
}

type ModalType =
  | 'modifyMenu'
  | 'modifyCategory'
  | 'createMenu'
  | 'createCategory';

const EditModalContext = createContext<EditModalContextType | undefined>(
  undefined,
);

// 초기 폼 데이터
const initialFormData: EditModalFormData = {
  name: '',
  price: undefined,
  category: undefined,
  description: '',
  images: [],
  options: [],
  toggleStates: {},
};

export function EditModalProvider({ children }: { children: ReactNode }) {
  const [currentModal, setCurrentModal] = useState<ModalType>(null);
  const [formData, setFormData] = useState<EditModalFormData>(initialFormData);

  const openModal = (
    type: ModalType,
    initialData: Partial<EditModalFormData> = {},
  ) => {
    // 초기 데이터 설정
    setFormData({
      ...initialFormData,
      ...initialData,
    });
    setCurrentModal(type);
  };

  const closeModal = () => {
    setCurrentModal(null);
    setFormData(initialFormData);
  };

  const updateField = <K extends keyof EditModalFormData>(
    field: K,
    value: EditModalFormData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateToggleState = (key: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      toggleStates: {
        ...prev.toggleStates,
        [key]: value,
      },
    }));
  };

  const saveEdit = (onSave: (data: EditModalFormData) => void) => {
    // 필수 필드 검증
    if (formData.name.trim()) {
      onSave(formData);
      closeModal();
    }
  };

  return (
    <EditModalContext.Provider
      value={{
        currentModal,
        isOpen: currentModal !== null,
        formData,
        openModal,
        closeModal,
        updateField,
        updateToggleState,
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
