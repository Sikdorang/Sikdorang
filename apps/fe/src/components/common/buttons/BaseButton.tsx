import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import Spinner from '../loadings/Spinner';

interface BaseButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'cancel';
  isLoading?: boolean;
}

export default function BaseButton({
  children,
  variant = 'default',
  isLoading = false,
  className = '',
  ...props
}: BaseButtonProps) {
  const baseClass =
    'w-full h-12 py-2 text-label-md rounded-sm focus:outline-none transition flex items-center justify-center select-none';
  const variantClass =
    variant === 'cancel'
      ? 'bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:bg-gray-200'
      : 'bg-blue-500 text-white hover:bg-blue-400 disabled:bg-gray-200 disabled:text-gray-300';

  return (
    <button className={`${baseClass} ${variantClass} ${className}`} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? <Spinner className="border-white" /> : children || '버튼'}
    </button>
  );
}
