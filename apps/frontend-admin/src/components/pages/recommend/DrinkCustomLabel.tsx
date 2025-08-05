import { forwardRef } from 'react';

interface DrinkCustomLabelProps {
  text: string;
  variant?: 'default' | 'red' | 'blue' | 'purple' | 'orange' | 'green';
  hover?: boolean;
  isStatus?: boolean;
  isTag?: boolean;
  onClick?: () => void;
  className?: string;
}

const DrinkCustomLabel = forwardRef<HTMLDivElement, DrinkCustomLabelProps>(
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
      'inline-flex items-center text-mobile-body-s-semibold border rounded-xl focus:outline-none transition select-none';
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
        ? `bg-chip-orangeBg text-chip-orangeText border-none ${hover ? 'hover:bg-chip-orangeBg' : ''}`
        : variant === 'blue'
          ? `bg-chip-blueBg text-chip-blueText border-none ${hover ? 'hover:bg-chip-blueBg' : ''}`
          : variant === 'purple'
            ? `bg-chip-purpleBg text-chip-purpleText border-none ${hover ? 'hover:bg-chip-purpleBg' : ''}`
            : variant === 'red'
              ? `bg-chip-redBg text-chip-redText border-none ${hover ? 'hover:bg-chip-redBg' : ''}`
              : variant === 'green'
                ? `bg-chip-greenBg text-chip-greenText border-none ${hover ? 'hover:bg-chip-greenBg' : ''}`
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
          {isStatus && !isTag ? '· ' : ''} {text}
        </span>
      </div>
    );
  },
);

DrinkCustomLabel.displayName = 'DrinkCustomLabel';

export default DrinkCustomLabel;
