import Link from 'next/link';

import ManageButton from './cells/ManageButton';
import MenuManageSelect from './cells/MenuManageSelect';
import MenuTextInput from './cells/MenuTextInput';

import { MESSAGES } from '@/constants/messages';
import { IManageMenuItem } from '@/types/model/menu';

interface MenuTableElementProps {
  idx: number;
  item: IManageMenuItem;
  categories: Array<{ id: number; category: string }>;
  status: string[];
  updateMenuItem: (id: number, field: keyof IManageMenuItem, value: string | boolean | number) => void;
  handleCategoryChange: (id: number, value: string) => void;
  handleStatusChange: (id: number, value: string) => void;
  setMenuErrors: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  menuErrors: Record<number, string>;
  onDeleteClick: () => void;
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
  onDeleteClick,
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
          className={`text-left p-2 my-6`}
          maxLength={20}
        />
      </td>

      <td className="text-center">
        <MenuTextInput
          variant="menu"
          defaultValue={item.price?.toString()}
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
                const rest = { ...prev };
                delete rest[item.id]; // 해당 id만 삭제
                return rest;
              });
              updateMenuItem(item.id, 'price', numericValue);
            }
          }}
          maxLength={11}
          className="p-2 my-6"
          errorMessage={menuErrors?.[item.id]}
        />
      </td>

      <td className="text-center">
        <MenuManageSelect
          options={categories.map((item) => item.category)}
          selectedOption={item.category!}
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
          tabIndex={item.id < 0 ? -1 : 0}
          onClick={(e) => {
            if (item.id < 0) e.preventDefault();
          }}
          style={item.id < 0 ? { pointerEvents: 'none', opacity: 0.5 } : {}}
        >
          <ManageButton variant="modify" disabled={item.id < 0}>
            편집하기
          </ManageButton>
        </Link>
      </td>

      <td className="text-center">
        <ManageButton
          variant="delete"
          disabled={item.id < 0}
          onClick={(e) => {
            if (item.id < 0) {
              e.preventDefault();
              return;
            }
            onDeleteClick();
          }}
        >
          삭제
        </ManageButton>
      </td>
    </tr>
  );
}
