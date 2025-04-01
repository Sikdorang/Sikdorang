import React from 'react';

interface BaseButtonProps {
  text: string;
  disabled?: boolean;
  variant?: 'default' | 'cancel';
  className?: string;
  onClick?: () => void;
}

export default function BaseButton({
  text,
  disabled = false,
  variant = 'default',
  className,
  onClick,
}: BaseButtonProps) {
  const baseClass = 'w-full py-[16px] text-label-md rounded-[4px] focus:outline-none transition';
  const variantClass =
    variant === 'cancel'
      ? 'bg-gray-100 text-gray-500 hover:bg-blue-400 disabled:bg-gray-200'
      : 'bg-blue-500 text-white hover:bg-blue-400 disabled:bg-gray-200 disabled:text-gray-300';

  return (
    <button className={`${baseClass} ${variantClass} ${className}`} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
}
