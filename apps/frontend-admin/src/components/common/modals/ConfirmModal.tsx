'use client';

import CloseIcon from '@public/icons/ic_x.svg';
import { ReactNode } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title = '확인',
  message = '',
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center mb-4">
          <div className="text-center text-dh-1 flex-1">{title}</div>
          <button onClick={onCancel}>
            <CloseIcon />
          </button>
        </div>

        <div className="mb-6 text-center text-gray-800">{message}</div>

        <div className="flex justify-center gap-2">
          <button
            type="button"
            className="rounded bg-gray-100 px-5 py-2 text-gray-700 hover:bg-gray-200 transition"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="rounded bg-red-500 px-5 py-2 text-white hover:bg-red-400 transition"
            onClick={() => {
              onConfirm();
              onCancel();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
