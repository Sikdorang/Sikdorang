import SaveButton from '@/components/common/buttons/CtaButton';
import TextInput from '@/components/common/inputs/TextInput';
import { useEditModal } from '@/contexts/NameEditModalContext';
import CloseIcon from '@public/icons/ic_x.svg';
import Image from 'next/image';
import { ReactNode } from 'react';

export default function NameEditModal({ children }: { children: ReactNode }) {
  const { isOpen, closeModal } = useEditModal();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function NameEditModalHeader({
  children,
  onSave,
}: {
  children: ReactNode;
  onSave: (name: string) => void;
}) {
  const { closeModal, saveEdit } = useEditModal();

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="grow-1" />
        <button onClick={closeModal}>
          <Image src={CloseIcon} alt="close" width={12} height={12} />
        </button>
      </div>

      <div className="mb-6 flex items-center justify-between text-2xl font-bold">
        <span className="grow-1">{children}</span>
        <SaveButton
          text="변경사항 저장하기"
          color="gray"
          width="fit"
          size="medium"
          onClick={() => saveEdit(onSave)}
        />
      </div>
    </div>
  );
}

interface NameEditModalBodyProps {
  label?: string;
  placeholder?: string;
}

export function NameEditModalBody({
  label,
  placeholder,
}: NameEditModalBodyProps) {
  const { name, setName } = useEditModal();

  return (
    <div className="mb-4">
      <TextInput
        label={label}
        placeholder={placeholder}
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={30}
      />
    </div>
  );
}
