'use client';

import { useWarningModal } from '@/contexts/WarningModalContext';
import CloseIcon from '@public/icons/ic_x.svg';
import Image from 'next/image';
import { ReactNode } from 'react';

export default function WarningModal({ children }: { children: ReactNode }) {
  const { isOpen, closeModal } = useWarningModal();
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function WarningModalHeader({ children }: { children: ReactNode }) {
  const { closeModal } = useWarningModal();
  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="grow" />
        <button onClick={closeModal}>
          <Image src={CloseIcon} alt="close" width={12} height={12} />
        </button>
      </div>
      <div className="mb-4 flex items-center justify-center text-2xl font-bold">
        {children}
      </div>
    </div>
  );
}

export function WarningModalBody({ children }: { children: ReactNode }) {
  const { message } = useWarningModal();
  return (
    <div className="mb-6 text-center text-gray-800">
      <p className="mb-2">{children}</p>
      {/* <p className="text-sm font-semibold text-yellow-600">{message}</p> */}
    </div>
  );
}

export function WarningModalActions({
  onConfirm,
  cancelText = '취소',
  confirmText = '확인',
}: {
  onConfirm: () => void;
  cancelText?: string;
  confirmText?: string;
}) {
  const { closeModal } = useWarningModal();

  return (
    <div className="flex justify-center gap-2">
      <button
        className="rounded bg-gray-100 px-6 py-2 text-gray-700 transition hover:bg-gray-200"
        onClick={closeModal}
        type="button"
      >
        {cancelText}
      </button>
      <button
        className="rounded bg-red-500 px-6 py-2 text-white transition hover:bg-red-400"
        onClick={() => {
          onConfirm();
          closeModal();
        }}
        type="button"
      >
        {confirmText}
      </button>
    </div>
  );
}
