'use client';

import {
  default as CategoryButton,
  default as FilterOptionButton,
  default as TableControlButton,
} from '@/components/common/buttons/CtaButton';
import SearchInput from '@/components/common/inputs/TextInput';
import GalleryIcon from '@public/icons/ic_grid.svg';
import TableIcon from '@public/icons/ic_list.svg';
import ShopManagementIcon from '@public/icons/ic_plus.svg';

import MenuTableRow from '@/components/pages/menuEdit/MenuTableRow';
import Image from 'next/image';
import { useState } from 'react';
import { IMenuTableItem } from '../../../../types/model/menu';

const categories = [
  { id: 1, text: '전체', count: 1 },
  { id: 2, text: '한식', count: 3 },
  { id: 3, text: '중식', count: 2 },
  { id: 4, text: '일식', count: 4 },
  { id: 5, text: '양식', count: 1 },
];

const filterOptions = [
  { id: 1, text: '전체' },
  { id: 2, text: '판매중만 보기' },
  { id: 3, text: '품절만 보기' },
  { id: 4, text: '숨김만 보기' },
  { id: 5, text: '미입력만 보기' },
];

const menuList: IMenuTableItem[] = [
  {
    id: 1,
    name: '참소라 무침',
    price: 25000,
    category: '안주',
    status: '판매 중',
    checked: false,
    order: '1',
  },
  {
    id: 2,
    name: '아롱사태 수육',
    price: 25000,
    category: '안주',
    status: '품절',
    checked: true,
    order: '1',
  },
  {
    id: 3,
    name: '앞다리살 수육',
    price: 25000,
    category: '안주',
    status: '숨김',
    checked: true,
    order: '1',
  },
];

export default function MenuEditPage() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(1);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="wrapper flex w-full flex-col items-center justify-center py-4">
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
          <div className="grow-1 flex gap-2">
            {categories.map((cat) => (
              <CategoryButton
                key={cat.id}
                text={cat.text}
                color={selectedCategory === cat.id ? 'black' : 'white'}
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
          </div>
          <CategoryButton
            text="카테고리 추가"
            color="gray"
            size="small"
            width="fit"
            right={
              <span className="text-mobile-body-s-semibold text-gray-200">
                <Image src={ShopManagementIcon} alt="plus" />
              </span>
            }
          />
        </div>
      </div>

      <div className="w-full border-b border-gray-100" />

      <div className="wrapper w-full p-4">
        <div className="flex gap-2">
          <div className="grow-1 flex items-center gap-2">
            <div className="">전체 13</div>
            <button>
              <Image src={TableIcon} alt="table" />
            </button>
            <button>
              <Image src={GalleryIcon} alt="gallery" />
            </button>
          </div>
          <TableControlButton
            text="삭제하기"
            color="gray"
            size="small"
            width="fit"
          />
          <TableControlButton
            text="변경사항 저장하기"
            color="gray"
            size="small"
            width="fit"
          />
        </div>
        <div className="flex gap-2 pt-2">
          {filterOptions.map((option) => (
            <FilterOptionButton
              key={option.id}
              text={option.text}
              color="gray"
              size="small"
              width="fit"
            />
          ))}
        </div>
      </div>

      <div className="wrapper w-full p-4">
        <table className="w-full table-auto border-none">
          <thead className="text-mobile-body-m-semibold text-w rounded-lg border-b border-b-gray-400 bg-gray-700">
            <tr>
              <th className="w-[3%] whitespace-nowrap rounded-tl-xl px-5 py-5"></th>
              <th className="w-[35%] whitespace-nowrap px-5 py-5 text-left">
                메뉴명
              </th>
              <th className="w-[10%] whitespace-nowrap px-5 py-5 text-left">
                가격
              </th>
              <th className="w-[12%] whitespace-nowrap px-5 py-5 text-left">
                카테고리
              </th>
              <th className="w-[10%] whitespace-nowrap px-5 py-5 text-left">
                상태
              </th>
              <th className="w-[8%] whitespace-nowrap rounded-tr-xl px-5 py-5">
                세부사항
              </th>
            </tr>
          </thead>
          <tbody className="text-mobile-body-m-regular text-gray-600">
            {menuList.map((item) => (
              <MenuTableRow key={item.id} item={item} onEdit={() => {}} />
            ))}
          </tbody>
        </table>
        <button
          className="text-mobile-body-m-semibold flex w-full items-center justify-center rounded-xl rounded-t-none border border-t-0 border-gray-300 py-5 text-gray-600"
          onClick={undefined}
        >
          메뉴 추가
          <span className="text-mobile-body-s-semibold ml-2 text-gray-200">
            <Image src={ShopManagementIcon} alt="plus" />
          </span>
        </button>
      </div>
    </div>
  );
}
