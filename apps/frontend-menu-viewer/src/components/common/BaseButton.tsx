import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react';

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {}

export default function BaseButton({ children, ...props }: Props) {
  return (
    <button
      className={`text-mb-3 text-main-900 bg-main-500 flex h-14 w-full items-center justify-center rounded-2xl`}
      {...props}
    >
      {children}
    </button>
  );
}
