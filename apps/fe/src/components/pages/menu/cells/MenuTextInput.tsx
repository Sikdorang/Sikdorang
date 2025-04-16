import React, { useState, useEffect, InputHTMLAttributes, useRef } from 'react';

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
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setInternalValue(defaultValue);
  }, [defaultValue]);

  const handleSave = () => {
    const trimmedValue = String(internalValue).trim();
    if (trimmedValue !== defaultValue) {
      onSave?.(trimmedValue);
    }
  };

  const [inputWidth, setInputWidth] = useState(40);
  useEffect(() => {
    if (variant === 'category' && spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth + 2);
    }
  }, [internalValue, variant]);

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
        className={`rounded ${
          variant === 'menu'
            ? 'w-full text-center'
            : 'bg-gray-100 border border-gray-300 px-2 py-1 text-label-sm-m text-gray-700 focus:outline-none transition'
        } ${className}`}
        style={variant === 'category' ? { width: inputWidth, ...props.style } : props.style}
        {...props}
      />
      {variant === 'category' && (
        <span
          ref={spanRef}
          className="invisible absolute whitespace-pre px-2 py-1 text-label-sm-m"
          style={{
            fontSize: inputRef.current ? window.getComputedStyle(inputRef.current).fontSize : undefined,
            fontFamily: inputRef.current ? window.getComputedStyle(inputRef.current).fontFamily : undefined,
          }}
        >
          {internalValue || props.placeholder || ''}
        </span>
      )}
      {errorMessage && <ErrorMessage className="mt-1 ml-1 text-left">{errorMessage}</ErrorMessage>}
    </div>
  );
}
