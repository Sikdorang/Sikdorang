import { ChangeEvent, InputHTMLAttributes, PropsWithChildren } from 'react';
import React, { useId } from 'react';

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement>, PropsWithChildren {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckboxInput({ children, checked, onChange, ...props }: CheckboxInputProps) {
  const id = useId();

  return (
    <div className="flex items-center space-x-2 mr-10">
      <input type="checkbox" id={id} checked={checked} className="cursor-pointer" onChange={onChange} {...props} />
      <label htmlFor={id} className="text-label-sm-m text-gray-800 cursor-pointer select-none">
        {children}
      </label>
    </div>
  );
}
