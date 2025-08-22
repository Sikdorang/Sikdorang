import CtaButton from '../../common/buttons/CtaButton';
import CheckedIcon from '@public/icons/ic_checked_box.svg';
import ToastCheckIcon from '@public/icons/ic_circle_check.svg';
import UncheckedIcon from '@public/icons/ic_empty_box.svg';
import TrashIcon from '@public/icons/ic_trashcan.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  options?: string[];
}

interface OrderListItemProps {
  tableNumber: number;
  items: OrderItem[];
  onSelectionChange: (tableNumber: number, selectedIds: number[]) => void;
}

export default function OrderListItem({
  tableNumber,
  items,
  onSelectionChange,
}: OrderListItemProps) {
  const containerId = `order-card-${tableNumber}`;

  const showToast = () => {
    toast('주문을 수락했어요', {
      containerId,
      icon: <Image src={ToastCheckIcon} alt={''} />,
      autoClose: 2000,
      type: 'default',
    });
  };

  const [localItems, setLocalItems] = useState(
    items.map((item) => ({ ...item, isSelected: false })),
  );

  useEffect(() => {
    setLocalItems(items.map((item) => ({ ...item, isSelected: false })));
  }, [items]);

  const selectedIds = localItems
    .filter((item) => item.isSelected)
    .map((item) => item.id);

  // 토글 함수
  const toggleItem = (id: number) => {
    setLocalItems((prev) => {
      const next = prev.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item,
      );
      const nextSelectedIds = next.filter((i) => i.isSelected).map((i) => i.id);
      onSelectionChange(tableNumber, nextSelectedIds);
      return next;
    });
  };

  const hasSelected = selectedIds.length > 0;

  const buttonText =
    selectedIds.length === 0
      ? '전체 주문 수락'
      : `선택한 ${selectedIds.length}개 주문 수락`;

  return (
    <div className="relative bg-white rounded-2xl shadow-lg mx-auto min-w-[255px] flex flex-col h-full">
      <div className="flex items-center justify-between p-4 pb-0">
        <h2 className="text-mh-1">테이블 {tableNumber}번</h2>

        <button className="p-2 bg-pink-100 rounded-lg hover:bg-pink-200 transition-colors">
          <Image src={TrashIcon} alt="" />
        </button>
      </div>

      <div className="text-gray-500 text-mb-6 px-4 mb-4">방금전</div>

      <div className="space-y-3 flex-1 overflow-auto bg-gray-100 p-4">
        {localItems.map((item, idx) => (
          <div
            key={item.id}
            className={
              'flex items-center gap-3 pb-3 ' +
              (idx === localItems.length - 1
                ? ''
                : 'border-b-[0.5px] border-gray-200')
            }
          >
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex w-full items-center">
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="mr-2 focus:outline-none"
                >
                  <Image
                    src={item.isSelected ? CheckedIcon : UncheckedIcon}
                    alt={item.isSelected ? 'checked' : 'unchecked'}
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </button>
                <span className="text-mb-4 text-gray-800">{item.name}</span>
                <div className="flex-1" />
                <span className="text-mb-4 text-gray-600">
                  {item.quantity}개
                </span>
              </div>
              {Array.isArray(item.options) && item.options.length > 0 && (
                <div className="flex w-full bg-gray-200 rounded-lg py-2 px-4">
                  {item.options.map((opt, i) => (
                    <p key={i} className="text-xs text-gray-500">
                      {opt}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4">
        <CtaButton onClick={showToast} text={buttonText} radius="_3xl" />
      </div>

      <ToastContainer
        containerId={containerId}
        position="bottom-center"
        hideProgressBar
        closeOnClick
        draggable={false}
        toastClassName="!rounded-2xl !shadow-md !bg-gray-800/90 !text-yellow-400 !text-mb-4 !w-fit !whitespace-nowrap !px-4"
        className="!m-0"
        style={{
          position: 'absolute',
          bottom: 100,
          left: 125,
          zIndex: 50,
        }}
      />
    </div>
  );
}
