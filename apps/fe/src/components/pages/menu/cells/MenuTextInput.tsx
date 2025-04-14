import React, { useState, useEffect, InputHTMLAttributes } from 'react';

import ErrorMessage from '@/components/common/labels/ErrorMessage';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant: 'menu' | 'category';
  onSave?: (value: string) => void;
  errorMessage?: string;
}

export default function MenuTextInput({
  variant,
  onSave,
  errorMessage,
  defaultValue = '',
  className = '',
  ...props
}: TextInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  useEffect(() => {
    setInternalValue(defaultValue);
  }, [defaultValue]);

  const handleSave = () => {
    const trimmedValue = String(internalValue).trim();
    if (trimmedValue !== defaultValue) {
      onSave?.(trimmedValue);
    }
  };

  return (
    <div className="flex flex-col">
      <input
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            (e.target as HTMLInputElement).blur();
          }
        }}
        className={`w-full p-2 my-6 rounded ${
          variant === 'menu'
            ? 'text-center'
            : 'bg-gray-100 border border-gray-300 px-3 py-2 text-label-xs-m text-gray-700 focus:outline-none transition'
        } ${className}`}
        {...props}
      />
      {errorMessage && <ErrorMessage className="mt-1 ml-1 text-left">{errorMessage}</ErrorMessage>}
    </div>
  );
}
