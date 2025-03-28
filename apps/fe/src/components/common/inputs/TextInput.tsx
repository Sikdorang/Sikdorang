import React from 'react';

interface TextInputProps {
  label?: string; // Label 텍스트
  type?: 'text' | 'password'; // 입력 필드 타입
  placeholder: string; // Placeholder 텍스트
  disabled?: boolean; // 비활성화 여부
  errorMessage?: string; // 오류 메시지
}

export default function TextInput({
  label,
  type = 'text',
  placeholder,
  disabled = false,
  errorMessage,
}: TextInputProps) {
  const baseClass =
    'w-full py-[12px] px-[16px] text-gray-800 text-label-sm-m rounded-[4px] focus:outline-none transition placeholder-gray-400 bg-white border border-gray-300';

  const errorClass = errorMessage ? 'border-red-500' : ''; // 오류가 있을 때 테두리 색상 변경

  return (
    <div className="flex flex-col space-y-[8px] text-label-sm-m">
      {label && <label className="text-gray-800 text-sm font-medium">{label}</label>}
      <input type={type} className={`${baseClass} ${errorClass}`} placeholder={placeholder} disabled={disabled} />
      {errorMessage && <span className="text-red-500 text-body-xs-m">{errorMessage}</span>}
    </div>
  );
}
