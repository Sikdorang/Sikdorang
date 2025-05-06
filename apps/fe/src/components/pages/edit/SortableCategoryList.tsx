'use client';

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import SortableCategoryItem from './SortableCategoryItem';
import { ICategoryWithMenus } from '@/types/model/category';

interface SortableCategoryListProps {
  items: ICategoryWithMenus[];
  onReorder: (oldIndex: number, newIndex: number) => void;
  selectedCategoryId: number;
  onSelectCategory: (id: number) => void;
}

export default function SortableCategoryList({
  items,
  onReorder,
  selectedCategoryId,
  onSelectCategory,
}: SortableCategoryListProps) {
  const sensors = useSensors(useSensor(PointerSensor));
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event; // active: 드래그하던 항목, over: 드래그가 놓인 위치
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id.toString() === active.id);
      const newIndex = items.findIndex((item) => item.id.toString() === over?.id);
      onReorder(oldIndex, newIndex);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={items.map((item) => item.id.toString())} strategy={verticalListSortingStrategy}>
        <ul className="flex flex-col gap-2 w-full">
          {items.map((item) => (
            <SortableCategoryItem
              id={item.id.toString()}
              key={item.id}
              isSelected={item.id === selectedCategoryId}
              onClick={() => onSelectCategory(item.id)}
            >
              {item.category}
            </SortableCategoryItem>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
