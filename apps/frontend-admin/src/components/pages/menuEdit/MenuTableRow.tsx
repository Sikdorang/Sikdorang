import { ICategoryItem } from '../../../types/model/category';
import {
  default as CategorySelect,
  default as StatusSelect,
} from './MenuCustomSelect';
import EditButton from '@/components/common/buttons/CtaButton';
import { MenuStatus, MenuStatusLabel } from '@/types/enum/status.enum';
import { IMenuTableItem } from '@/types/model/menu';
import CheckedIcon from '@public/icons/ic_checked_box.svg';
import UncheckedIcon from '@public/icons/ic_empty_box.svg';
import { useEffect, useState } from 'react';

interface MenuTableRowProps {
  item: IMenuTableItem;
  categories: ICategoryItem[];
  checked: boolean;
  onEdit: (menuId: number) => void;
  onCheck: (menuId: number) => void;
  onUpdate: (menuId: number, field: keyof IMenuTableItem, value: any) => void;
  isLastRow: boolean;
}

export default function MenuTableRow({
  item,
  categories,
  checked,
  onEdit,
  onCheck,
  onUpdate,
  isLastRow,
}: MenuTableRowProps) {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);

  useEffect(() => {
    setName(item.name);
    setPrice(item.price);
  }, [item.name, item.price]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  const handleNameBlur = () => {
    if (name !== item.name) {
      onUpdate(item.id, 'name', name);
    }
  };

  const handlePriceBlur = () => {
    if (price !== item.price) {
      onUpdate(item.id, 'price', price);
    }
  };

  const statusNumber = MenuStatus[item.status as keyof typeof MenuStatus];
  const handleCategoryChange = (newId: number) => {
    if (newId !== Number(item.categoryId)) {
      onUpdate(item.id, 'categoryId', newId);
    }
  };

  const handleStatusChange = (newStatus: number) => {
    const newStatusKey = newStatus as unknown as keyof typeof MenuStatus;
    const newStatusString = MenuStatus[newStatusKey] as unknown as
      | 'SALE'
      | 'HIDDEN'
      | 'SOLDOUT';

    if (newStatusString !== item.status) {
      onUpdate(item.id, 'status', newStatusString);
    }
  };

  return (
    <tr>
      <td
        className={`items-center border-b border-l border-t border-gray-300 pl-6 ${
          isLastRow ? 'rounded-bl-xl' : ''
        }`}
        onClick={() => onCheck(item.id)}
      >
        {checked ? (
          <CheckedIcon width={24} height={24} />
        ) : (
          <UncheckedIcon width={24} height={24} />
        )}
      </td>
      <td className="border-b border-t border-gray-300 px-5 py-5">
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          className="w-full bg-transparent px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="메뉴명을 입력하세요"
        />
      </td>
      <td className="border-b border-t border-gray-300 px-5 py-5">
        <input
          type="text"
          value={price}
          onChange={handlePriceChange}
          onBlur={handlePriceBlur}
          className="w-full bg-transparent px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="가격을 입력하세요"
        />
      </td>
      <td className="border-b border-t border-gray-300 px-5 py-5">
        <CategorySelect
          options={categories.map((c) => ({ id: c.id, label: c.category }))}
          selectedId={item.categoryId}
          onChange={handleCategoryChange}
        />
      </td>
      <td className="border-b border-t border-gray-300 px-5 py-5">
        <StatusSelect
          options={Object.entries(MenuStatusLabel).map(([key, label]) => ({
            id: Number(key) as MenuStatus,
            label,
          }))}
          selectedId={statusNumber}
          isStatus
          onChange={handleStatusChange}
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
          onClick={() => onEdit(item.id)}
        />
      </td>
    </tr>
  );
}
