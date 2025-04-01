import React from 'react';

interface MainControlButtonProps {
  text: string;
  disabled?: boolean;
  variant?: 'default' | 'category';
  className?: string;
  onClick?: () => void;
}

export default function MainControlButton({
  text,
  disabled = false,
  variant = 'default',
  className,
  onClick,
}: MainControlButtonProps) {
  const baseClass = 'w-fit px-3 py-3 text-label-md rounded-[4px] border border-gray-200 focus:outline-none transition';

  const variantClass =
    variant === 'category'
      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-300'
      : 'bg-white text-gray-600 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-300';

  return (
    <button className={`${baseClass} ${variantClass} ${className}`} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
}
