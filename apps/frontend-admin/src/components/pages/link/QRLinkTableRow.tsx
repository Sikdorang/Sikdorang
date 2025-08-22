import MenuCustomDropdown from '../menuEdit/MenuCustomDropdown';
import { ITableQRLinkItem } from '@/types/model/link';
import { useState } from 'react';

interface QRLinkTableRowProps {
  item: ITableQRLinkItem;
  isLastRow: boolean;
}

export default function QRLinkTableRow({
  item,
  isLastRow,
}: QRLinkTableRowProps) {
  const [tableName, setTableName] = useState(item.tableName);

  return (
    <tr key={item.tableId}>
      <td
        className={`items-center border-b border-l border-t border-gray-300 px-5 py-5 ${
          isLastRow ? 'rounded-bl-xl' : ''
        }`}
      >
        <input
          type="text"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          className="w-full rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="테이블 이름 입력"
        />
      </td>
      <td
        className={`border-b border-r border-t border-gray-300 px-5 py-5 text-center ${
          isLastRow ? 'rounded-br-xl' : ''
        }`}
      >
        <MenuCustomDropdown
          options={['일번', '이번']}
          selectedOption={''}
          onChange={function (value: string): void {
            throw new Error('Function not implemented.');
          }}
        />
      </td>
    </tr>
  );
}
