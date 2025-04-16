'use client';

import { useSortable } from '@dnd-kit/sortable';
import CategoryItem from '../../common/items/CategoryItem';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  id: string;
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function SortableCategoryItem({ id, isSelected, onClick, children }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CategoryItem draggable={true} isSelected={isSelected} onClick={onClick}>
        {children}
      </CategoryItem>
    </div>
  );
}
