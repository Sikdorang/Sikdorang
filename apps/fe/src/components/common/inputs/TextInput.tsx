import React from 'react';

interface TextInputProps {
  label?: string;
  type?: 'text' | 'password';
  placeholder: string;
  disabled?: boolean;
  errorMessage?: string;
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

  return (
    <div className="flex flex-col space-y-[8px] text-label-sm-m">
      {label && <label className="text-gray-800 text-sm font-medium">{label}</label>}
      <input type={type} className={`${baseClass}`} placeholder={placeholder} disabled={disabled} />
      {errorMessage && <span className="text-red-500 text-body-xs-m">{errorMessage}</span>}
    </div>
  );
}
