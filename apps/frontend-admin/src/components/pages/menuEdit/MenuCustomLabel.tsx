import { forwardRef } from 'react';

interface MenuCustomLabelProps {
  text: string;
  variant?: 'default' | 'red' | 'blue' | 'purple' | 'orange';
  hover?: boolean;
  isStatus?: boolean;
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
      onClick,
      className = '',
    },
    ref,
  ) => {
    const baseClass =
      'inline-flex items-center text-mobile-body-s-semibold border rounded-xl focus:outline-none transition select-none';
    if (isStatus) {
      if (text === '판매 중') {
        variant = 'blue';
      } else if (text === '숨김') {
        variant = 'orange';
      } else if (text === '품절') {
        variant = 'purple';
      }
    }

    const hoverClass = hover ? 'hover:bg-gray-200' : '';

    const variantClass =
      variant === 'orange'
        ? `bg-chip-orangeBg text-chip-orangeText border-none ${hover ? 'hover:bg-chip-orangeBg' : ''}`
        : variant === 'blue'
          ? `bg-chip-blueBg text-chip-blueText border-none ${hover ? 'hover:bg-chip-blueBg' : ''}`
          : variant === 'purple'
            ? `bg-chip-purpleBg text-chip-purpleText border-none ${hover ? 'hover:bg-chip-purpleBg' : ''}`
            : text === '카테고리 선택' && !isStatus
              ? `bg-w text-gray-400 border-gray-300 ${hoverClass}`
              : `bg-w text-gray-700 border-gray-300 ${hoverClass}`;

    return (
      <div
        ref={ref}
        className={`${baseClass} ${variantClass} shrink-0 px-2 py-1 ${className}`}
        onClick={onClick}
      >
        <span>
          {isStatus ? '· ' : ''} {text}
        </span>
      </div>
    );
  },
);

MenuCustomLabel.displayName = 'MenuCustomLabel';

export default MenuCustomLabel;
