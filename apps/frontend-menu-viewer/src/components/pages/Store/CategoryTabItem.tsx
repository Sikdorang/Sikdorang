import { forwardRef } from 'react';

interface Props {
  label: string;
  count: number;
  selected?: boolean;
  onClick: () => void;
}

const CategoryTabItem = forwardRef<HTMLLIElement, Props>(
  ({ label, count, selected = false, onClick }, ref) => {
    return (
      <li
        ref={ref}
        className={`flex h-11 cursor-pointer items-center gap-2 rounded-full border px-5 ${
          selected ? 'border-gray-800 bg-gray-800' : 'border-gray-200'
        } transition-colors duration-300`}
        onClick={onClick}
      >
        <span
          className={`text-mb-5 whitespace-nowrap ${
            selected ? 'text-white' : 'text-gray-700'
          }`}
        >
          {label}
        </span>
        <span
          className={`text-mb-5 whitespace-nowrap ${
            selected ? 'text-gray-200' : 'text-gray-500'
          }`}
        >
          {count}
        </span>
      </li>
    );
  },
);

export default CategoryTabItem;
