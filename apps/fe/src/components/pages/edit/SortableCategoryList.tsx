import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import SortableCategoryItem from './SortableCategoryItem';
import { ICategoryItem } from '@/types/model/category';

interface SortableCategoryListProps {
  items: ICategoryItem[];
  onReorder: (oldIndex: number, newIndex: number) => void;
}

export default function SortableCategoryList({ items, onReorder }: SortableCategoryListProps) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id.toString() === active.id);
      const newIndex = items.findIndex((item) => item.id.toString() === over?.id);
      console.log(oldIndex, newIndex);
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
            <SortableCategoryItem id={item.id.toString()} key={item.id} isSelected={false} onClick={() => {}}>
              {item.category}
            </SortableCategoryItem>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
