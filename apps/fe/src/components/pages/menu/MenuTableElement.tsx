import Link from 'next/link';

import ManageButton from './cells/ManageButton';
import MenuManageSelect from './cells/MenuManageSelect';
import MenuTextInput from './cells/MenuTextInput';

import { MESSAGES } from '@/constants/messages';

interface IMenu {
  id: number;
  menu: string;
  price: number;
  category: string;
  status: string;
}

interface MenuTableElementProps {
  idx: number;
  item: IMenu;
  categories: Array<{ id: number; category: string }>;
  status: string[];
  updateMenuItem: (id: number, field: keyof IMenu, value: any) => void;
  handleCategoryChange: (id: number, value: string) => void;
  handleStatusChange: (id: number, value: string) => void;
  setMenuErrors: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  menuErrors: Record<number, string>;
}

export default function MenuTableElement({
  idx,
  item,
  categories,
  status,
  updateMenuItem,
  handleCategoryChange,
  handleStatusChange,
  setMenuErrors,
  menuErrors,
}: MenuTableElementProps) {
  return (
    <tr key={item.id}>
      <td className="text-center">{idx + 1}</td>

      <td className="items-center">
        <MenuTextInput
          variant="menu"
          defaultValue={item.menu}
          placeholder="메뉴명"
          onSave={(value) => updateMenuItem(item.id, 'menu', value)}
          className={`text-left`}
          maxLength={20}
        />
      </td>

      <td className="text-center">
        <MenuTextInput
          variant="menu"
          defaultValue={item.price.toString()}
          placeholder="가격"
          onSave={(value) => {
            const numericValue = Number(value);
            if (isNaN(numericValue)) {
              setMenuErrors((prev) => ({
                ...prev,
                [item.id]: MESSAGES.invalidPriceError,
              }));
            } else {
              setMenuErrors((prev) => {
                const { [item.id]: _, ...rest } = prev;
                return rest;
              });
              updateMenuItem(item.id, 'price', numericValue);
            }
          }}
          maxLength={11}
          errorMessage={menuErrors[item.id]}
        />
      </td>

      <td className="text-center">
        <MenuManageSelect
          options={categories.map((item) => item.category)}
          selectedOption={item.category}
          onChange={(value) => handleCategoryChange(item.id, value)}
        />
      </td>

      <td className="text-center">
        <MenuManageSelect
          options={status}
          selectedOption={item.status || '판매 예정'}
          isStatus={true}
          onChange={(value) => handleStatusChange(item.id, value)}
        />
      </td>

      <td className="text-center">
        <Link
          href={{
            pathname: `/menu/modify`,
            query: {
              id: item.id,
            },
          }}
        >
          <ManageButton variant="modify">편집하기</ManageButton>
        </Link>
      </td>

      <td className="text-center">
        <Link
          href={{
            pathname: '/menu/delete',
            query: { id: item.id, name: item.menu },
          }}
        >
          <ManageButton variant="delete">삭제</ManageButton>
        </Link>
      </td>
    </tr>
  );
}
