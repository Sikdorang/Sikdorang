import { forwardRef } from 'react';

interface MenuCustomFinderDropdownItemProps {
  text: string;
  onClick?: () => void;
  className?: string;
  isSelectedItem?: boolean;
  isNumbers?: boolean;
}

const MenuCustomFinderDropdownItem = forwardRef<
  HTMLDivElement,
  MenuCustomFinderDropdownItemProps
>(
  (
    {
      text,
      onClick,
      className = '',
      isSelectedItem = false,
      isNumbers = false,
    },
    ref,
  ) => {
    const SelectedItem = isSelectedItem
      ? `border border-gray-200 bg-white`
      : '';

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={`flex items-center justify-center px-4 py-2 border border-gray-200 ${SelectedItem} rounded-3xl min-w-[60px] cursor-pointer transition select-none ${className}`}
      >
        <span className="text-gray-700 text-mb-3">
          {text}
          {isNumbers ? '개' : ''}
        </span>
      </div>
    );
  },
);

MenuCustomFinderDropdownItem.displayName = 'MenuCustomFinderDropdownItem';

export default MenuCustomFinderDropdownItem;
