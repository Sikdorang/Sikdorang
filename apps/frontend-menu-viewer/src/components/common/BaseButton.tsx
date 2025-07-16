import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react';

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  color?: 'default' | 'black';
}

export default function BaseButton({
  children,
  color = 'default',
  ...props
}: Props) {
  const colorMap = {
    default: 'text-main-900 bg-main-500',
    black: 'text-white bg-gray-800',
  };
  return (
    <button
      className={`text-mb-3 ${colorMap[color]} flex h-14 w-full items-center justify-center rounded-2xl transition-colors duration-300 disabled:bg-gray-100 disabled:text-gray-400`}
      {...props}
    >
      {children}
    </button>
  );
}
