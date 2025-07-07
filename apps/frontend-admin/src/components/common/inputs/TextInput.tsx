import CancelIcon from '@public/icons/ic_cancel.svg';
import Image from 'next/image';
import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  maxLength?: number;
  error?: boolean;
  onClear?: () => void;
}

export default function TextInput({
  label = '제목',
  labelClassName = '',
  value = '',
  onChange,
  onClear,
  placeholder = '상세를 입력해주세요.',
  maxLength = 50,
  disabled = false,
  error = false,
  ...rest
}: TextInputProps) {
  return (
    <div className="w-full">
      <label
        className={`text-mobile-head-l-semibold mb-2 block text-gray-800 ${labelClassName}`}
      >
        {label}
      </label>
      <div
        className={`relative flex items-center rounded-2xl border bg-white px-6 py-4 transition-colors ${
          error
            ? 'border-system-error'
            : disabled
              ? 'border-gray-200 bg-gray-50'
              : value
                ? 'border-main-500'
                : 'focus-within:border-main-500 border-gray-200'
        }`}
      >
        <input
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          disabled={disabled}
          placeholder={placeholder}
          className={`text-mobile-body-m-regular w-full border-none bg-transparent text-gray-800 outline-none placeholder:text-gray-300 ${disabled ? 'text-gray-300' : ''} `}
          {...rest}
        />
        {!disabled && value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 transition hover:bg-gray-100"
            aria-label="입력값 삭제"
          >
            <Image src={CancelIcon} alt="검색" width={24} height={24} />
          </button>
        )}
      </div>
      <div className="mt-2 flex justify-end">
        <span className="text-mobile-caption-s-regular select-none text-gray-400">
          {(value as string).length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
