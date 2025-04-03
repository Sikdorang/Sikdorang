import { PropsWithChildren } from 'react';

interface ErrorMessageProps extends PropsWithChildren {
  className?: string;
}

export default function ErrorMessage({ children, className = '' }: ErrorMessageProps) {
  return <span className={`animate-shake text-red-500 text-body-xs ${className}`}>{children}</span>;
}
