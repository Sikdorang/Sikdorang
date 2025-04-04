import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface CarouselButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {}

export default function CarouselButton({ children, ...props }: CarouselButtonProps) {
  return (
    <button
      className={`bg-gray-900/60 backdrop-blur-xs rounded-full w-8 h-8 flex justify-center items-center ${props.className}`}
      {...props}
    >
      {children}
    </button>
  );
}
