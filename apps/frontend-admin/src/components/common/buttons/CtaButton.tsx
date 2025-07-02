'use client';

import React from 'react';

interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  isLoading?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: 'yellow' | 'gray' | 'red' | 'white';
  width?: 'full' | 'fit';
  className?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export default function CtaButton({
  text = '버튼',
  isLoading = false,
  size = 'medium',
  className = '',
  color = 'yellow',
  width = 'full',
  disabled,
  onClick,
  left,
  right,
  ...props
}: CtaButtonProps) {
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

  const hoverColorStyles = {
    yellow: 'hover:bg-main-500',
    gray: 'hover:bg-gray-800',
    red: 'hover:bg-system-error',
    white: 'hover:bg-gray-100',
  };

  const borderColorStyles = {
    yellow: 'border-main-500',
    gray: 'border-gray-800',
    red: 'border-system-error',
    white: 'border-gray-200',
  };

  const iconSizeStyles = {
    small: 'h-4 w-4',
    medium: 'h-5 w-5',
    large: 'h-6 w-6',
  };

  const flexStyle =
    width === 'fit'
      ? 'inline-flex items-center justify-center'
      : 'flex w-full items-center justify-center';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) return;
    onClick?.(e);
  };

  return (
    <button
      className={`${backgroundColorStyles[color]} ${borderColorStyles[color]} ${hoverColorStyles[color]} ${flexStyle} rounded-xl border transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${sizeStyles[size]} ${className} `}
      disabled={disabled || isLoading}
      onClick={handleClick}
      {...props}
    >
      {left && <span className="mr-2 flex items-center">{left}</span>}

      {isLoading && (
        <div
          className={`border-chip-yellowText animate-spin rounded-full border-2 border-t-transparent ${iconSizeStyles[size]} mr-2`}
        />
      )}

      <span className={`${textSizeStyles[size]} ${textColorStyles[color]}`}>
        {text}
      </span>

      {right && <span className="ml-2 flex items-center">{right}</span>}
    </button>
  );
}
