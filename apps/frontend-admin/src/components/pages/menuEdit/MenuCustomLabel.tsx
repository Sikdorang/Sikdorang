import { forwardRef } from 'react';

interface MenuCustomLabelProps {
  text: string;
  variant?: 'default' | 'red' | 'blue' | 'purple' | 'orange' | 'green';
  hover?: boolean;
  isStatus?: boolean;
  isTag?: boolean;
  onClick?: () => void;
  className?: string;
}

const MenuCustomLabel = forwardRef<HTMLDivElement, MenuCustomLabelProps>(
  (
    {
      text,
      variant = 'default',
      hover = true,
      isStatus = false,
      isTag = false,
      onClick,
      className = '',
    },
    ref,
  ) => {
    const baseClass =
      'inline-flex items-center text-mb-5 border rounded-full focus:outline-none transition select-none';
    if (isStatus) {
      if (text === '판매 중') {
        variant = 'blue';
      } else if (text === '숨김') {
        variant = 'orange';
      } else if (text === '품절') {
        variant = 'purple';
      } else if (text === '신메뉴') {
        variant = 'green';
      } else if (text === '인기') {
        variant = 'red';
      }
    }

    if (isTag) {
      if (text === '신메뉴') {
        variant = 'green';
      } else if (text === '인기' || text === '필수') {
        variant = 'red';
      }
    }

    const hoverClass = hover ? 'hover:bg-gray-200' : '';

    const variantClass =
      variant === 'orange'
        ? `bg-orange-200 text-orange-500 border-none ${hover ? 'hover:bg-orange-200' : ''}`
        : variant === 'blue'
          ? `bg-blue-200 text-blue-500 border-none ${hover ? 'hover:bg-blue-200' : ''}`
          : variant === 'purple'
            ? `bg-purple-200 text-purple-500 border-none ${hover ? 'hover:bg-purple-200' : ''}`
            : variant === 'red'
              ? `bg-red-200 text-red-500 border-none ${hover ? 'hover:bg-red-200' : ''}`
              : variant === 'green'
                ? `bg-green-200 text-green-500 border-none ${hover ? 'hover:bg-green-200' : ''}`
                : text === '카테고리 선택' && !isStatus
                  ? `bg-white text-gray-400 border-gray-300 ${hoverClass}`
                  : `bg-white text-gray-700 border-gray-300 ${hoverClass}`;

    return (
      <div
        ref={ref}
        className={`${baseClass} ${variantClass} shrink-0 px-2 py-1 ${className}`}
        onClick={onClick}
      >
        <span>
          {isStatus && !isTag ? '· ' : ''} {text}
        </span>
      </div>
    );
  },
);

MenuCustomLabel.displayName = 'MenuCustomLabel';

export default MenuCustomLabel;
