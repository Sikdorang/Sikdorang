'use client';

import { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import SortableCategoryItem from './SortableCategoryItem';

const initialCategories = [
  '시즌 메뉴',
  '음식',
  '막걸리',
  '프리미엄 탁주',
  '청주',
  '약주',
  '증류식 소주, 리큐르',
  '지화자 PICK! 전통주',
  '카테고리 카테고리 12',
  '추가 메뉴',
];

export default function SortableCategoryList() {
  const [categories, setCategories] = useState(initialCategories);
  const [selected, setSelected] = useState('전체');

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = categories.indexOf(active.id as string);
      const newIndex = categories.indexOf(over?.id as string);
      setCategories(arrayMove(categories, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={categories} strategy={verticalListSortingStrategy}>
        <ul className="flex flex-col gap-2 w-full">
          {categories.map((category) => (
            <SortableCategoryItem
              id={category}
              key={category}
              isSelected={selected === category}
              onClick={() => setSelected(category)}
            >
              {category}
            </SortableCategoryItem>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
