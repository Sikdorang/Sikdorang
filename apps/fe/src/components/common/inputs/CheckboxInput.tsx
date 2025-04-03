import React, { useId } from 'react';

interface CheckboxInputProps {
  text: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function CheckboxInput({ text, checked, onChange }: CheckboxInputProps) {
  const id = useId();

  return (
    <div className="flex items-center space-x-2 mr-10">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="cursor-pointer"
      />
      <label htmlFor={id} className="text-label-sm-m text-gray-800 cursor-pointer">
        {text}
      </label>
    </div>
  );
}
