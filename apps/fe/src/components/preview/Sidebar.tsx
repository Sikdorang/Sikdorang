'use client';

import React, { PropsWithChildren } from 'react';

interface PreviewSidebarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function PreviewSidebar({ categories, selectedCategory, onSelectCategory }: PreviewSidebarProps) {
  return (
    <div className="z-10 sm:max-w-40 w-full sticky top-24 self-start bg-white py-2 sm:p-0  shadow-sm sm:shadow-none">
      <ul className="flex sm:flex-col gap-2 overflow-x-scroll scroll-hide">
        {categories.map((category) => (
          <CategoryItem
            key={category}
            isSelected={selectedCategory === category}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </CategoryItem>
        ))}
      </ul>
    </div>
  );
}
