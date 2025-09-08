'use client';

import CtaButton from '@/components/common/buttons/CtaButton';
import { OrderResponse } from '@/types/response/order';
import { toast, ToastContainer } from 'react-toastify';

interface OrderBillProps {
  order: OrderResponse;
  onComplete: (orderId: number) => void;
  onReject: (orderId: number) => void;
}

export default function OrderBill({
  order,
  onComplete,
  onReject,
}: OrderBillProps) {
  const containerId = `order-card-${order.orderId}`;

  const handleComplete = () => {
    toast('조리가 완료되었어요', {
      containerId,
      autoClose: 1500,
      type: 'success',
      onClose: () => {
        onComplete(order.orderId);
      },
    });
  };

  const handleReject = () => {
    toast('주문이 거절되었어요', {
      containerId,
      autoClose: 1500,
      type: 'error',
      onClose: () => {
        onReject(order.orderId);
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-200 relative">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            테이블 {order.tableNumber}번
          </div>
          <div className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleTimeString('ko-KR')}
          </div>
        </div>
        <div className="text-gray-700 font-medium">#{order.orderId}</div>
      </div>

      {/* 주문 메뉴 리스트 */}
      <div className="mb-4">
        {order.items.map((item) => (
          <div key={item.orderItemId} className="mb-3">
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">{item.menuName}</span>
              <span className="text-gray-600">{item.quantity}개</span>
            </div>
            {item.selectedOptions.map((opt) => (
              <div
                key={opt.menuOptionId}
                className="ml-4 text-gray-600 text-sm"
              >
                {opt.menuOptionName}:{' '}
                {opt.optionDetails.map((d) => d.name).join(', ')}
              </div>
            ))}
            <div className="text-gray-500 text-xs">
              합계: {item.lineTotal.toLocaleString()}원
            </div>
          </div>
        ))}
      </div>

      {/* 전체 합계 */}
      <div className="border-t pt-2 mb-4 text-right text-gray-700 font-semibold">
        총합: {order.totalPrice.toLocaleString()}원
      </div>

      {/* 조리 완료 버튼 */}
      <CtaButton
        onClick={handleComplete}
        text="조리 완료"
        radius="_3xl"
        className="mb-4"
      />

      <CtaButton
        onClick={handleReject}
        text="주문 거절"
        radius="_3xl"
        color="red"
      />

      <ToastContainer
        containerId={containerId}
        position="bottom-center"
        hideProgressBar
        closeOnClick
        draggable={false}
        toastClassName="!rounded-2xl !shadow-md !bg-gray-800/90 !text-white !text-sm !w-fit !whitespace-nowrap !px-4"
        className="!m-0"
        style={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
        }}
      />
    </div>
  );
}
