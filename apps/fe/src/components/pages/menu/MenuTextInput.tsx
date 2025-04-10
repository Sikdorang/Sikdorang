import React, { useState, useEffect, useRef, InputHTMLAttributes } from 'react';
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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInternalValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (inputRef.current) {
      const tempSpan = document.createElement('span');
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      tempSpan.style.whiteSpace = 'pre';
      tempSpan.style.font = window.getComputedStyle(inputRef.current).font;
      tempSpan.textContent = internalValue || props.placeholder || '';
      document.body.appendChild(tempSpan);
      inputRef.current.style.width = `${tempSpan.offsetWidth + 15}px`;
      document.body.removeChild(tempSpan);
    }
  }, [internalValue, props.placeholder]);

  const handleSave = () => {
    if (internalValue.trim() !== defaultValue) {
      onSave?.(internalValue.trim());
    }
  };

  return (
    <div className="flex flex-col">
      <input
        ref={inputRef}
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            (e.target as HTMLInputElement).blur();
          }
        }}
        className={`w-full rounded ${
          variant === 'menu'
            ? 'p-1 text-center'
            : 'bg-gray-100 border border-gray-300 px-[6px] py-[4px] text-label-xs-m text-gray-700 focus:outline-none transition'
        } ${className}`}
        {...props}
      />
      {errorMessage && <ErrorMessage className="mt-1 ml-1 text-left">{errorMessage}</ErrorMessage>}
    </div>
  );
}
