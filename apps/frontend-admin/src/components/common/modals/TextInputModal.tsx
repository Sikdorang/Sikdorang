'use client';

import CtaButton from '../buttons/CtaButton';
import TextInput from '@/components/common/inputs/TextInput';
import CloseIcon from '@public/icons/ic_x.svg';
import { useEffect, useMemo, useState } from 'react';

interface TextInputModalProps {
  isOpen: boolean;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  initialValue?: string;
  maxLength?: number;
  onConfirm: (inputText: string) => void;
  onCancel: () => void;
}

export default function TextInputModal({
  isOpen,
  title = '확인',
  subtitle = '',
  placeholder = '',
  initialValue = '',
  maxLength = 50,
  onConfirm,
  onCancel,
}: TextInputModalProps) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [originalValue, setOriginalValue] = useState(initialValue);

  useEffect(() => {
    setInputValue(initialValue);
    setOriginalValue(initialValue);
  }, [initialValue]);

  const hasChanges = useMemo(
    () => inputValue.trim() !== originalValue.trim(),
    [inputValue, originalValue],
  );

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  const handleConfirm = () => {
    onConfirm(inputValue.trim());
    setInputValue('');
    setOriginalValue('');
    onCancel();
  };

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
        <div className="flex items-center justify-end mb-4">
          <button
            onClick={() => {
              setInputValue('');
              setOriginalValue('');
              onCancel();
            }}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="flex items-center mb-4">
          <div className="flex-1 text-dh-1 flex-1">{title}</div>
          <CtaButton
            text="변경사항 저장하기"
            width="fit"
            size="small"
            radius="xl"
            color={hasChanges ? 'yellow' : 'gray'}
            disabled={!hasChanges}
            onClick={handleConfirm}
          />
        </div>

        <TextInput
          label={subtitle}
          labelClassName="text-mb-1"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          maxLength={maxLength}
        />
      </div>
    </div>
  );
}
