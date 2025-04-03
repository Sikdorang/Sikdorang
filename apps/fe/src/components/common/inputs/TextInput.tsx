import { InputHTMLAttributes } from 'react';
import ErrorMessage from '../labels/ErrorMessage';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

export default function TextInput({ label, errorMessage, ...props }: TextInputProps) {
  const baseClass =
    'w-full py-3 px-4 text-gray-800 text-label-sm-m rounded-sm focus:outline-none transition placeholder-gray-400 bg-white border border-gray-300';

  return (
    <div className="flex flex-col">
      {label && <label className="text-gray-800 text-label-sm-m mb-2">{label}</label>}
      <input className={`${baseClass}`} {...props} />
      {errorMessage && <ErrorMessage className="mt-1">{errorMessage}</ErrorMessage>}
    </div>
  );
}
