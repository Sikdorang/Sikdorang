'use client';

import { DndContext, PointerSensor, useSensor, useSensors, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { IMenuItem } from '@/types/model/menu';
import SortableMenuItem from './SortableMenuItem';

interface SortableMenuListProps {
  items: IMenuItem[];
  onReorder: (oldIndex: number, newIndex: number) => void;
}

export default function SortableMenuList({ items, onReorder }: SortableMenuListProps) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id.toString() === active.id);
      const newIndex = items.findIndex((item) => item.id.toString() === over?.id);
      onReorder(oldIndex, newIndex);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.id.toString())} strategy={rectSortingStrategy}>
        {items.map((item) => (
          <SortableMenuItem key={item.id} item={item} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
