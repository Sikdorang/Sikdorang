import { InputHTMLAttributes, useState } from 'react';
import ErrorMessage from '../labels/ErrorMessage';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

export default function TextInput({ label, errorMessage, maxLength, value, onChange, ...props }: TextInputProps) {
  const [charCount, setCharCount] = useState(value?.toString().length || 0);
  const baseClass =
    'w-full py-3 px-4 text-gray-800 text-label-sm-m rounded-sm focus:outline-none transition placeholder-gray-400 bg-white border border-gray-300';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharCount(e.target.value.length);
    onChange?.(e);
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
      <input className={`${baseClass}`} maxLength={maxLength} value={value} onChange={handleChange} {...props} />
      {errorMessage && <ErrorMessage className="mt-1">{errorMessage}</ErrorMessage>}
    </div>
  );
}
