import React, { forwardRef } from 'react';

interface MenuElementLabelProps {
  text: string;
  variant?: 'default' | 'red' | 'blue' | 'purple';
  hover?: boolean;
  isStatus?: boolean;
  onClick?: () => void;
  className?: string;
}

const MenuElementLabel = forwardRef<HTMLDivElement, MenuElementLabelProps>(
  ({ text, variant = 'default', hover = true, isStatus = false, onClick, className = '' }, ref) => {
    const baseClass =
      'inline-flex items-center text-label-sm-m border rounded-sm focus:outline-none transition select-none';
    if (isStatus) {
      if (text === '판매 중') {
        variant = 'blue';
      } else if (text === '판매 중단') {
        variant = 'red';
      } else if (text === '판매 예정') {
        variant = 'purple';
      }
    }

    const hoverClass = hover ? 'hover:bg-gray-200' : '';

    const variantClass =
      variant === 'red'
        ? `bg-red-100 text-red-500 border-red-200 ${hover ? 'hover:bg-red-200' : ''}`
        : variant === 'blue'
          ? `bg-blue-100 text-blue-500 border-blue-200 ${hover ? 'hover:bg-blue-200' : ''}`
          : variant === 'purple'
            ? `bg-purple-100 text-purple-500 border-purple-200 ${hover ? 'hover:bg-purple-200' : ''}`
            : text === '카테고리 선택' && !isStatus
              ? `bg-gray-100 text-gray-400 border-gray-300 ${hoverClass}`
              : `bg-gray-100 text-gray-700 border-gray-300 ${hoverClass}`;

    return (
      <div ref={ref} className={`${baseClass} ${variantClass} py-1 px-2 shrink-0 ${className}`} onClick={onClick}>
        <span>{text}</span>
      </div>
    );
  },
);

MenuElementLabel.displayName = 'MenuElementLabel';

export default MenuElementLabel;
