import { ICategoryItem } from '../../../types/model/category';
import {
  default as CategorySelect,
  default as StatusSelect,
} from './MenuCustomSelect';
import { default as EditButton } from '@/components/common/buttons/CtaButton';
import { MenuStatus, MenuStatusLabel } from '@/types/enum/status.enum';
import { IMenuTableItem } from '@/types/model/menu';
import CheckedIcon from '@public/icons/ic_checked_box.svg';
import UncheckedIcon from '@public/icons/ic_empty_box.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface MenuTableRowProps {
  item: IMenuTableItem;
  categories: ICategoryItem[];
  onEdit: (menuId: number) => void;
  onCheck: (menuId: number) => void;
  onUpdate: (
    menuId: number,
    updatedData: { name?: string; price?: string },
  ) => void;
  isLastRow: boolean;
}

export default function MenuTableRow({
  item,
  categories,
  onEdit,
  onCheck,
  onUpdate,
  isLastRow,
}: MenuTableRowProps) {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);

  // item이 변경될 때 로컬 상태 업데이트
  useEffect(() => {
    setName(item.name);
    setPrice(item.price);
  }, [item.name, item.price]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = e.target.value;
    setPrice(newPrice);
  };

  const handleNameBlur = () => {
    if (name !== item.name) {
      onUpdate(item.id, { name });
    }
  };

  const handlePriceBlur = () => {
    if (price !== item.price) {
      onUpdate(item.id, { price });
    }
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  const handlePriceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  return (
    <tr key={item.id}>
      <td
        className={`items-center border-b border-l border-t border-gray-300 pl-6 ${
          isLastRow ? 'rounded-bl-xl' : ''
        }`}
        onClick={() => onCheck(item.id)}
      >
        {item.checked ? (
          <Image
            src={CheckedIcon}
            alt="check"
            width={24}
            height={24}
            className="opacity-100 scale-100 transition-all duration-200"
          />
        ) : (
          <Image
            src={UncheckedIcon}
            alt="check"
            width={24}
            height={24}
            className="opacity-100 scale-100 transition-all duration-200"
          />
        )}
      </td>
      <td className="border-b border-t border-gray-300 px-5 py-5">
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          onKeyDown={handleNameKeyDown}
          className="w-full border-none bg-transparent px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:rounded"
          placeholder="메뉴명을 입력하세요"
        />
      </td>
      <td className="border-b border-t border-gray-300 px-5 py-5">
        <input
          type="text"
          value={price}
          onChange={handlePriceChange}
          onBlur={handlePriceBlur}
          onKeyDown={handlePriceKeyDown}
          className="w-full border-none bg-transparent px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:rounded"
          placeholder="가격을 입력하세요"
        />
      </td>
      <td className="border-b border-t border-gray-300 px-5 py-5">
        <CategorySelect
          options={categories.map((c) => c.category)}
          selectedOption={item.category || '카테고리 없음'}
          onChange={() => {}}
        />
      </td>
      <td className="border-b border-t border-gray-300 px-5 py-5">
        <StatusSelect
          options={Object.values(MenuStatusLabel)}
          selectedOption={
            MenuStatusLabel[item.status as MenuStatus] || '판매 중'
          }
          isStatus={true}
          onChange={() => {}}
        />
      </td>
      <td
        className={`border-b border-r border-t border-gray-300 px-5 py-5 text-center ${
          isLastRow ? 'rounded-br-xl' : ''
        }`}
      >
        <EditButton
          text="편집하기"
          color="gray"
          size="small"
          width="fit"
          radius="xl"
          onClick={() => onEdit(item.id)}
        />
      </td>
    </tr>
  );
}
