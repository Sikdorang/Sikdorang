'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import MenuItem from '../../common/items/MenuItem';
import { IMenuItem } from '@/types/model/menu';

interface SortableMenuItemProps {
  item: IMenuItem;
}

export default function SortableMenuItem({ item }: SortableMenuItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <MenuItem draggable={true} item={item} />
    </div>
  );
}
