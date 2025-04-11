import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface MainControlButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  variant?: 'default' | 'category' | 'menu';
  variant?: 'default' | 'category' | 'menu';
}

export default function MainControlButton({
  children,
  variant = 'default',
  className = '',
  ...props
}: MainControlButtonProps) {
  const baseClass =
    'w-fit px-3 py-3 text-label-md rounded-sm border border-gray-200 focus:outline-none transition select-none';

  const variantClass =
    variant === 'category'
      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-300'
      : variant === 'menu'
        ? 'bg-blue-500 text-blue-100 hover:bg-blue-400 disabled:bg-gray-200 disabled:text-gray-300'
        : 'bg-white text-gray-600 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-300';

  return (
    <button className={`${baseClass} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
