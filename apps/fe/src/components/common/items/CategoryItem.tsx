import { PropsWithChildren } from 'react';
import DragHandleIcon from '@public/icons/ic_drag_handle.svg';

interface CategoryItemProps extends PropsWithChildren {
  isSelected?: boolean;
  draggable?: boolean;
  onClick: () => void;
  dragHandleProps?: React.HTMLAttributes<HTMLSpanElement>;
}

export default function CategoryItem({
  children,
  isSelected = false,
  draggable = false,
  onClick,
  dragHandleProps,
}: CategoryItemProps) {
  return (
    <li
      onClick={onClick}
      className={`flex items-center gap-1 justify-between rounded-sm border cursor-pointer px-3 h-10  overflow-hidden  transition-colors duration-200 select-none
        ${
          isSelected
            ? 'bg-gray-900 text-white border-gray-700'
            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-gray-800 hover:border-gray-400'
        }
      `}
    >
      <span className="whitespace-nowrap text-label-sm-m text-center truncate">{children}</span>
      {draggable && (
        <span {...dragHandleProps}>
          <DragHandleIcon className="shrink-0" />
        </span>
      )}
    </li>
  );
}
