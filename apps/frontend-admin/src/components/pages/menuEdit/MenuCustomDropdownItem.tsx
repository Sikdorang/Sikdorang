import ChevronDownIcon from '@public/icons/ic_chevron_down.svg';
import Image from 'next/image';
import { forwardRef } from 'react';

interface MenuCustomDropdownItemProps {
  text: string;
  onClick?: () => void;
  className?: string;
  isSelectedItem?: boolean;
  isNumbers?: boolean;
}

const MenuCustomDropdownItem = forwardRef<
  HTMLDivElement,
  MenuCustomDropdownItemProps
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
        className={`flex items-center justify-center px-4 py-2 ${SelectedItem} rounded-2xl min-w-[60px] cursor-pointer transition select-none ${className}`}
      >
        <span className="text-gray-700 text-mb-3">
          {text}
          {isNumbers ? '개' : ''}
        </span>
        {SelectedItem ? (
          <Image
            src={ChevronDownIcon}
            alt="드롭다운"
            width={12}
            height={6}
            className="ml-2"
          />
        ) : undefined}
      </div>
    );
  },
);

MenuCustomDropdownItem.displayName = 'MenuCustomDropdownItem';

export default MenuCustomDropdownItem;
