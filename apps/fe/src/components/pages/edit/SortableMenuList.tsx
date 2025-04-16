'use client';

import { useState } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { IMenuItem } from '@/types/model/menu';
import SortableMenuItem from './SortableMenuItem';

type IMenuCategory = {
  id: string;
  name: string;
  items: IMenuItem[];
};

export default function SortableMenuList() {
  const sampleData: IMenuCategory[] = [
    {
      id: 'cat-1',
      name: '메인 메뉴',
      items: [
        {
          id: 1,
          name: '스테이크',
          images: ['/images/jiwhaja_dish_3.png'],
          description: '육즙 가득한 그릴드 스테이크 육즙 가득한 그릴드 스테이크 ',
          price: 19000,
          status: true,
        },
        {
          id: 2,
          name: '파스타',
          images: ['/images/jiwhaja_dish_3.png'],
          description: '부드러운 크림 파스타',
          price: 13000,
          status: false,
        },
        {
          id: 3,
          name: '스테이크',
          images: ['/images/jiwhaja_dish_3.png'],
          description: '육즙 가득한 그릴드 스테이크',
          price: 19000,
          status: true,
        },
        {
          id: 4,
          name: '파스타',
          images: ['/images/jiwhaja_dish_3.png'],
          description: '부드러운 크림 파스타',
          price: 13000,
          status: false,
        },
        {
          id: 5,
          name: '스테이크',
          images: ['/images/jiwhaja_dish_3.png'],
          description: '육즙 가득한 그릴드 스테이크',
          price: 19000,
          status: true,
        },
        {
          id: 6,
          name: '파스타',
          images: ['/images/jiwhaja_dish_3.png'],
          description: '부드러운 크림 파스타',
          price: 13000,
          status: false,
        },
        {
          id: 7,
          name: '스테이크',
          images: ['/images/jiwhaja_dish_3.png'],
          description: '육즙 가득한 그릴드 스테이크',
          price: 19000,
          status: true,
        },
        {
          id: 8,
          name: '파스타',
          images: ['/images/jiwhaja_dish_3.png'],
          description: '부드러운 크림 파스타',
          price: 13000,
          status: false,
        },
        {
          id: 9,
          name: '스테이크',
          images: ['/images/jiwhaja_dish_3.png'],
          description: '육즙 가득한 그릴드 스테이크',
          price: 19000,
          status: true,
        },
        {
          id: 10,
          name: '파스타',
          images: ['/images/jiwhaja_dish_3.png'],
          description: '부드러운 크림 파스타',
          price: 13000,
          status: false,
        },
      ],
    },
    {
      id: 'cat-2',
      name: '음료',
      items: [
        {
          id: 3,
          name: '아메리카노',
          images: ['/images/jiwhaja_dish_3.png'],
          description: '진한 에스프레소 베이스',
          price: 4000,
          status: true,
        },
      ],
    },
  ];
  const [menuItems, setMenuItems] = useState(sampleData[0].items);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = menuItems.findIndex((item) => item.id === active.id);
      const newIndex = menuItems.findIndex((item) => item.id === over?.id);
      setMenuItems(arrayMove(menuItems, oldIndex, newIndex));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={menuItems.map((item) => item.id)} strategy={rectSortingStrategy}>
        {menuItems.map((item) => (
          <SortableMenuItem key={item.id} item={item} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
