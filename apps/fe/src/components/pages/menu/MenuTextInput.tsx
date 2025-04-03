import React, { useState, useEffect, useRef, InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant: 'menu' | 'category'; // 입력 방식 구분
  onSave?: (value: string) => void; // 저장 시 호출되는 콜백
}

export default function MenuTextInput({
  variant,
  defaultValue = '',
  onSave,
  className = '',
  ...props
}: TextInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null); // input 요소 참조

  // 외부 defaultValue 변경 시 내부 상태 동기화
  useEffect(() => {
    setInternalValue(defaultValue);
  }, [defaultValue]);

  // 텍스트 길이에 따라 너비 조정
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
  );
}
