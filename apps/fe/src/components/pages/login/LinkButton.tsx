import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {}

export default function LinkButton({ children, ...props }: LinkButtonProps) {
  return (
    <button
      className="text-label-sm-m text-gray-500 p-2 hover:text-gray-800 rounded transition-colors duration-300 whitespace-nowrap line-clamp-1"
      {...props}
    >
      {children}
    </button>
  );
}
