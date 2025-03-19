"use client";

import React from "react";

interface PreviewSidebarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function PreviewSidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}: PreviewSidebarProps) {
  return (
    <div className="w-1/5 bg-gray-100 p-4">
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => onSelectCategory(category)}
              className={`block w-full text-center px-4 py-2 rounded-md ${
                selectedCategory === category
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
