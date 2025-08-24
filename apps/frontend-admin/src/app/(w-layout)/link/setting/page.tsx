'use client';

import CtaButton from '../../../../components/common/buttons/CtaButton';
import QRLinkTableRow from '@/components/pages/link/QRLinkTableRow';
import { ITableQRLinkItem } from '@/types/model/link';
import AddIcon from '@public/icons/ic_plus.svg';
import Image from 'next/image';

const tableList: ITableQRLinkItem[] = [
  { tableId: 1, tableName: '테이블 1번', qrNumber: 'QR-001' },
  { tableId: 2, tableName: '테이블 2번', qrNumber: 'QR-002' },
  { tableId: 3, tableName: '테이블 3번', qrNumber: 'QR-003' },
  { tableId: 4, tableName: '테이블 4번', qrNumber: 'QR-004' },
  { tableId: 5, tableName: '테이블 5번', qrNumber: 'QR-005' },
];

export default function LinkSettingPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="wrapper flex w-full flex-col items-center justify-center py-4 gap-4 border-t border-gray-100">
        <div className="flex justify-end w-full color-gray-700 px-12">
          <CtaButton
            text="QR 코드 설정"
            color="gray"
            size="small"
            width="fit"
            radius="full"
            right={
              <span>
                <Image src={AddIcon} width={16} height={16} alt="plus" />
              </span>
            }
          />
        </div>

        <div className="flex w-full px-12 py-4 gap-16">
          <table className="w-full table-auto border-separate border-spacing-0 overflow-hidden rounded-xl">
            <thead className="text-mb-3 text-white rounded-lg border-b border-b-gray-400 bg-gray-900">
              <tr>
                <th className="w-[50%] whitespace-nowrap px-5 py-5 text-left">
                  테이블 이름
                </th>
                <th className="w-[50%] whitespace-nowrap px-5 py-5 text-left">
                  QR 번호
                </th>
              </tr>
            </thead>
            <tbody className="text-mb-3 rounded-t-none rounded-bl-xl rounded-br-xl border border-t-0 text-gray-700">
              {tableList.map((item, idx) => (
                <QRLinkTableRow
                  key={item.tableId}
                  item={item}
                  isLastRow={idx === tableList.length - 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
