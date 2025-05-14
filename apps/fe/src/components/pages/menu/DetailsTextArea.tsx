import ErrorMessage from '@/components/common/labels/ErrorMessage';
import { InputHTMLAttributes, TextareaHTMLAttributes, useState, useEffect } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  rows?: number;
}

export default function TextInput({
  label,
  errorMessage,
  maxLength,
  value,
  onChange,
  rows = 4,
  ...props
}: TextInputProps) {
  const [charCount, setCharCount] = useState(value?.toString().length || 0);
  const baseClass =
    'w-full py-3 px-4 text-gray-800 text-label-sm-m rounded-sm focus:outline-none transition placeholder-gray-400 bg-white border border-gray-300 resize-y'; // ✅ resize-y 추가

  useEffect(() => {
    setCharCount(value?.toString().length || 0);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    onChange?.(e as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="flex flex-col">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <label className="text-gray-800 text-label-sm-m">{label}</label>
          {maxLength && (
            <span className="text-label-sm-m text-gray-400">
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      )}
      <textarea
        className={`${baseClass} min-h-[100px]`}
        rows={rows}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
      {errorMessage && <ErrorMessage className="mt-1">{errorMessage}</ErrorMessage>}
    </div>
  );
}
