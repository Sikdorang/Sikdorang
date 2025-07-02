'use client';

import CategoryButton from '@/components/common/buttons/CtaButton';
import SearchInput from '@/components/common/inputs/TextInput';
import { useState } from 'react';

const categories = [
  { id: 1, text: '전체', count: 1 },
  { id: 2, text: '한식', count: 3 },
  { id: 3, text: '중식', count: 2 },
  { id: 4, text: '일식', count: 4 },
  { id: 5, text: '양식', count: 1 },
];

export default function MenuEditPage() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(1);

  return (
    <div className="wrapper">
      <div className="flex flex-col items-center justify-between">
        <SearchInput
          label="메뉴 편집"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClear={() => setSearchValue('')}
          placeholder="찾으시는 메뉴가 있으신가요?"
          maxLength={50}
          disabled={false}
        />

        <div className="flex w-full gap-2">
          {categories.map((cat) => (
            <CategoryButton
              key={cat.id}
              text={cat.text}
              color={selectedCategory === cat.id ? 'gray' : 'white'}
              size="small"
              width="fit"
              right={
                <span className="text-mobile-body-s-semibold text-gray-200">
                  {cat.count}
                </span>
              }
              onClick={() => setSelectedCategory(cat.id)}
            />
          ))}
          <CategoryButton
            text="카테고리 추가"
            color="white"
            size="small"
            width="fit"
            className="inline-flex"
          />
        </div>
      </div>
    </div>
  );
}
