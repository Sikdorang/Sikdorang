import { PropsWithChildren } from 'react';

interface CategoryItemProps extends PropsWithChildren {
  isSelected?: boolean;
  onClick: () => void;
}

export default function CategoryItem({ children, isSelected = false, onClick }: CategoryItemProps) {
  return (
    <li
      onClick={onClick}
      className={`cursor-pointer p-3 truncate overflow-hidden whitespace-nowrap rounded-sm border text-label-sm-m text-center transition-colors duration-200 select-none
        ${
          isSelected
            ? 'bg-gray-900 text-white border-gray-700'
            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-gray-800 hover:border-gray-400'
        }
      `}
    >
      {children}
    </li>
  );
}
