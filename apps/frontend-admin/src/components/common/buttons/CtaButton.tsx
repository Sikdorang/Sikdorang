'use client';

import React from 'react';

interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  isLoading?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: 'yellow' | 'gray' | 'red' | 'white';
  className?: string;
}

export default function CtaButton({
  text = '카카오로 계속하기',
  isLoading = false,
  size = 'medium',
  className = '',
  color = 'yellow',
  disabled,
  onClick,
  ...props
}: CtaButtonProps) {
  // 크기별 스타일 정의
  const sizeStyles = {
    small: 'px-4 py-2 gap-2',
    medium: 'px-6 py-4 gap-3',
    large: 'px-8 py-5 gap-4',
  };

  const textSizeStyles = {
    small: 'text-mobile-body-s-regular',
    medium: 'text-mobile-body-s-regular',
    large: 'text-mobile-body-m-semibold',
  };

  const textColorStyles = {
    yellow: 'text-main-900',
    gray: 'text-w',
    red: 'text-w',
    white: 'text-gray-700',
  };

  const backgroundColorStyles = {
    yellow: 'bg-main-500',
    gray: 'bg-gray-800',
    red: 'bg-system-error',
    white: 'bg-w',
  };

  const iconSizeStyles = {
    small: 'h-4 w-4',
    medium: 'h-5 w-5',
    large: 'h-6 w-6',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) return;
    onClick?.(e);
  };

  return (
    <button
      className={`${backgroundColorStyles[color]} border-chip-yellowText hover:bg-chip-yellowText hover:text-w flex w-full items-center justify-center rounded-xl border transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${sizeStyles[size]} ${className} `}
      disabled={disabled || isLoading}
      onClick={handleClick}
      {...props}
    >
      {isLoading && (
        <div
          className={`border-chip-yellowText animate-spin rounded-full border-2 border-t-transparent ${iconSizeStyles[size]}`}
        />
      )}

      <span className={`${textSizeStyles[size]} ${textColorStyles[color]}`}>
        {isLoading ? '로그인 중...' : text}
      </span>
    </button>
  );
}
