import React, { type PropsWithChildren } from 'react';

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  isSelected?: boolean;
}

export default function OutlineButton({
  children,
  isSelected = false,
  ...props
}: Props) {
  return (
    <button
      className={`text-mb-3 h-13 flex w-full items-center justify-center rounded-2xl border transition-colors duration-300 ${isSelected ? 'bg-main-100 border-main-500 text-main-500' : 'border-gray-200 bg-white text-gray-700'} `}
      {...props}
    >
      {children}
    </button>
  );
}
