import { IMenuTableItem } from '@/types/model/menu';
import CheckedIcon from '@public/icons/ic_checked_box.svg';
import UncheckedIcon from '@public/icons/ic_empty_box.svg';

import { default as EditButton } from '@/components/common/buttons/CtaButton';
import Image from 'next/image';
import MenuCustomSelect from './MenuCustomSelect';

interface MenuTableRowProps {
  item: IMenuTableItem;
  onEdit: () => void;
}

export default function MenuTableRow({ item }: MenuTableRowProps) {
  return (
    <tr key={item.id}>
      <td className="items-center border-b border-l border-t border-gray-300 px-5 py-5">
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
        <MenuCustomSelect
          options={['카테고리 1', '카테고리 2', '카테고리 3']}
          selectedOption={item.category || '카테고리 1'}
          onChange={() => {}}
        />
      </td>
      <td className="border-b border-t border-gray-300 px-5 py-5">
        <MenuCustomSelect
          options={['판매 중', '판매 예정', '품절']}
          selectedOption={item.status || '판매 중'}
          isStatus={true}
          onChange={() => {}}
        />
      </td>
      <td className="border-b border-r border-t border-gray-300 px-5 py-5 text-center">
        <EditButton text="편집하기" color="gray" size="small" width="fit" />
      </td>
    </tr>
  );
}
