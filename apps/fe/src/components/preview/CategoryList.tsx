'use client';

import { useState } from 'react';
import CategoryItem from './CategoryItem';

const categories = [
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

export default function CategoryList() {
  const [selected, setSelected] = useState('전체');

  return (
    <ul className="flex flex-col gap-2 w-full">
      {categories.map((category) => (
        <CategoryItem key={category} isSelected={selected === category} onClick={() => setSelected(category)}>
          {category}
        </CategoryItem>
      ))}
    </ul>
  );
}
