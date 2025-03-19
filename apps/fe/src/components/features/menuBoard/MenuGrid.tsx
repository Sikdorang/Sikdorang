"use client";

import React, { useRef, useState } from "react";
import Sortable from "sortablejs";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image?: string; // 이미지 URL 추가 가능
}

interface MenuGridProps {
  menuItems: MenuItem[]; // 초기 메뉴 아이템 배열
  onSortEnd?: (sortedItems: MenuItem[]) => void; // 정렬 후 호출되는 콜백 함수
}

export default function MenuGrid({ menuItems, onSortEnd }: MenuGridProps) {
  const [items, setItems] = useState<MenuItem[]>(menuItems);
  const gridRef = useRef<HTMLDivElement>(null);

  // Initialize Sortable when the component mounts
  React.useEffect(() => {
    if (gridRef.current) {
      Sortable.create(gridRef.current, {
        animation: 150,
        onEnd: (evt) => {
          const newItems = [...items];
          const [movedItem] = newItems.splice(evt.oldIndex!, 1);
          newItems.splice(evt.newIndex!, 0, movedItem);
          setItems(newItems); // Update the state with the new order

          if (onSortEnd) {
            onSortEnd(newItems); // Call the callback with the new order
          }
        },
      });
    }
  }, [items, onSortEnd]);

  return (
    <div ref={gridRef} className="w-4/5 p-4 grid grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="border rounded-lg shadow-sm overflow-hidden bg-white"
          style={{ height: "400px" }} // Fixed height for each cell
        >
          {/* Image Container */}
          <div className="relative w-full h-2/3 overflow-hidden">
            <img
              src={item.image || "/placeholder.jpg"}
              alt={item.name}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Text Container */}
          <div className="p-4 h-1/3 flex flex-col justify-between">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-400">{item.description}</p>
            <p className="text-gray-800 font-bold text-right">{item.price}원</p>
          </div>
        </div>
      ))}
    </div>
  );
}
