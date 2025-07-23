import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react';

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  color?: 'yellow' | 'black';
}

export default function BaseButton({
  children,
  color = 'black',
  ...props
}: Props) {
  const colorMap = {
    yellow: 'text-main-900 bg-main-500',
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
