import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ManageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  variant?: 'default' | 'modify' | 'delete';
}

export default function ManageButton({ children, variant = 'default' }: ManageButtonProps) {
  const baseClass = 'w-fit p-2 text-label-sm-sb rounded-md border border-gray-200 focus:outline-none transition';

  const variantClass =
    variant === 'default'
      ? 'bg-white text-gray-600 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-300'
      : variant === 'modify'
        ? 'bg-blue-500 text-blue-100 hover:bg-blue-400 disabled:bg-blue-300'
        : variant === 'delete'
          ? 'bg-gray-800 text-blue-100 hover:bg-gray-700 disabled:bg-blue-600'
          : '';

  return <button className={`${baseClass} ${variantClass}`}>{children}</button>;
}
