'use client';

export interface Order {
  id: string;
  date: string;
  number: string;
}

interface OrderTableProps {
  orders: Order[];
  onSelect: (order: Order) => void;
}

export default function OrderTable({ orders, onSelect }: OrderTableProps) {
  return (
    <table className="w-full border-collapse bg-white rounded-xl overflow-hidden">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="px-6 py-3 text-left">주문 일자</th>
          <th className="px-6 py-3 text-left">주문 번호</th>
          <th className="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} className="hover:bg-gray-100">
            <td className="px-6 py-4">{order.date}</td>
            <td className="px-6 py-4">{order.number}</td>
            <td className="px-6 py-4 text-right">
              <button
                onClick={() => onSelect(order)}
                className="px-3 py-1 border rounded-full text-sm"
              >
                내역 보기
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
