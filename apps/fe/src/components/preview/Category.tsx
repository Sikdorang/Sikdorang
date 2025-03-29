import { PropsWithChildren } from 'react';

interface CategoryProps extends PropsWithChildren {
  isSelected?: boolean;
  onClick: () => void;
}

export default function Category({ children, isSelected = false, onClick }: CategoryProps) {
  return (
    <li
      onClick={onClick}
      className={`whitespace-nowrap text-label-sm-m px-3 py-3 ${isSelected ? 'text-gray-100 border-gray-200 bg-gray-900' : 'bg-white border-gray-200 text-gray-600'} border rounded-sm text-center hover:cursor-pointer  hover:text-gray-400 hover:border-gray-300  transition-colors`}
    >
      {children}
    </li>
  );
}
