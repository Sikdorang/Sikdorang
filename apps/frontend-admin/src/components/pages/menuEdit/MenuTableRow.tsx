import {
  default as CategorySelect,
  default as StatusSelect,
} from './MenuCustomSelect';
import { default as EditButton } from '@/components/common/buttons/CtaButton';
import { IMenuTableItem } from '@/types/model/menu';
import CheckedIcon from '@public/icons/ic_checked_box.svg';
import UncheckedIcon from '@public/icons/ic_empty_box.svg';
import Image from 'next/image';

interface MenuTableRowProps {
  item: IMenuTableItem;
  onEdit: (menuId: number) => void;
  onCheck: (menuId: number) => void;
  isLastRow: boolean;
}

export default function MenuTableRow({
  item,
  onEdit,
  onCheck,
  isLastRow,
}: MenuTableRowProps) {
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
        {item.name}
      </td>
      <td className="border-b border-t border-gray-300 px-5 py-5">
        {item.price}
      </td>
      <td className="border-b border-t border-gray-300 px-5 py-5">
        <CategorySelect
          options={['안주', '카테고리 2', '카테고리 3']}
          selectedOption={item.category || '카테고리 1'}
          onChange={() => {}}
        />
      </td>
      <td className="border-b border-t border-gray-300 px-5 py-5">
        <StatusSelect
          options={['판매 중', '품절', '숨김']}
          selectedOption={item.status || '판매 중'}
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
