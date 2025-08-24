'use client';

export interface OrderDetailData {
  tableNumber: number;
  time: string;
  sideMenu: { name: string; items: string[] }[];
  drinks: { name: string; quantity: number }[];
  totalPrice: number;
}

interface OrderDetailProps {
  detail?: OrderDetailData;
}

export default function OrderDetail({ detail }: OrderDetailProps) {
  if (!detail) {
    return (
      <div className="w-80 bg-gray-50 rounded-xl p-6">
        <p className="text-gray-500">주문을 선택해주세요.</p>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 w-80 bg-gray-50 rounded-xl p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold mb-2">
          테이블 {detail.tableNumber}번
        </h3>
        <p className="text-sm text-gray-600 mb-4">{detail.time}</p>

        {/* 사이드 메뉴 */}
        <div className="mb-4">
          <p className="font-medium">사이드 메뉴 {detail.sideMenu.length}개</p>
          <ul className="pl-4 list-disc">
            {detail.sideMenu.map((grp, i) => (
              <li key={i}>
                <span className="font-medium">{grp.name}:</span>{' '}
                {grp.items.join(', ')}
              </li>
            ))}
          </ul>
        </div>

        {/* 음료 */}
        <div>
          <p className="font-medium">소주 {detail.drinks.length}개</p>
          <ul className="pl-4 list-disc">
            {detail.drinks.map((d, i) => (
              <li key={i}>
                {d.name} × {d.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 총액 */}
      <div className="mt-6 text-right">
        <span className="font-bold">
          총 {detail.totalPrice.toLocaleString()}원
        </span>
      </div>
    </div>
  );
}
