import { default as DrinkCustomSelect } from './DrinkCustomSelect';
import { IMenuTableItem } from '@/types/model/menu';

interface RecommendTableRowProps {
  item: IMenuTableItem;
  isLastRow: boolean;
}

export default function RecommendTableRow({
  item,
  isLastRow,
}: RecommendTableRowProps) {
  return (
    <tr key={item.id}>
      <td
        className={`items-center border-b border-l border-t border-gray-300 px-5 py-5 ${
          isLastRow ? 'rounded-bl-xl' : ''
        }`}
      >
        {item.name}
      </td>
      <td className="border-b border-t border-gray-300 px-5 py-5">
        {item.price}
      </td>
      <td
        className={`border-b border-r border-t border-gray-300 px-5 py-5 ${
          isLastRow ? 'rounded-br-xl' : ''
        }`}
      >
        <DrinkCustomSelect
          options={['안주', '카테고리 2', '카테고리 3']}
          selectedOption={item.category || '카테고리 1'}
          onChange={() => {}}
        />
      </td>
    </tr>
  );
}
