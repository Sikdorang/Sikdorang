import { IMenuTableItem } from '@/types/model/menu';
import CheckedIcon from '@public/icons/ic_checked_box.svg';
import UncheckedIcon from '@public/icons/ic_empty_box.svg';

import { default as EditButton } from '@/components/common/buttons/CtaButton';
import Image from 'next/image';
import {
  default as CategorySelect,
  default as StatusSelect,
} from './MenuCustomSelect';

interface MenuTableRowProps {
  item: IMenuTableItem;
  onEdit: (menuId: number) => void;
  isLastRow: boolean;
}

export default function MenuTableRow({
  item,
  onEdit,
  isLastRow,
}: MenuTableRowProps) {
  return (
    <tr key={item.id}>
      <td
        className={`items-center border-b border-l border-t border-gray-300 px-5 py-5 ${
          isLastRow ? 'rounded-bl-xl' : ''
        }`}
      >
        {item.checked ? (
          <Image src={CheckedIcon} alt="check" width={24} height={24} />
        ) : (
          <Image src={UncheckedIcon} alt="check" width={24} height={24} />
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
          onClick={() => onEdit(item.id)}
        />
      </td>
    </tr>
  );
}
