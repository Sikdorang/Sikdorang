import ErrorSvg from '@/assets/icons/ic_error_yellow.svg?react';
import { ORDER_MENU_STATE } from '@/constants/constants';
import { formatDateTime, formatIndex, formatNumber } from '@/utilities/format';
import { getWarningText } from '@/utilities/getWarningText';

interface OrderCardProps {
  index: number;
  order: IOrderItem;
  onReorder: () => void;
  reorderDisabled?: boolean;
}

export default function OrderCard({
  index,
  order,
  onReorder,
  reorderDisabled = true,
}: OrderCardProps) {
  return (
    <li className="border border-gray-200 rounded-2xl overflow-hidden">
      <div className="bg-gray-800 flex items-center justify-between h-12 px-4">
        <p className="text-mb-1 text-gray-100">{formatIndex(index)}</p>
        <p className="text-mc-2 text-gray-100">
          {formatDateTime(order.createdAt)}
        </p>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <ul className="flex flex-col gap-6">
          {order.items.map((item) => (
            <li>
              <div
                className={`${
                  (item.state === ORDER_MENU_STATE.MENU_UNAVAILABLE ||
                    item.state === ORDER_MENU_STATE.OPTION_UNAVAILABLE ||
                    item.state === ORDER_MENU_STATE.SOLDOUT) &&
                  'opacity-40'
                }`}
              >
                <div className="flex justify-between items-start gap-6">
                  <p className="text-mb-3 text-gray-700 flex-1">{item.name}</p>
                  <div className="flex flex-col justify-end gap-1">
                    <p className="text-mb-3 text-gray-700 text-right">
                      {formatNumber(item.menuPrice + item.optionPrice)}원
                    </p>
                    <p className="text-mb-6 text-gray-400 text-right">
                      {item.quantity}개
                    </p>
                  </div>
                </div>
                {item.optionGroups.length > 0 && (
                  <ul className="flex flex-col gap-1 mt-1">
                    {item.optionGroups.map((group) => (
                      <li key={group.id} className="text-mb-6 text-gray-500">
                        {group.title}:{' '}
                        {group.items.map((option) => option.name).join(', ')}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {item.state !== ORDER_MENU_STATE.AVAILABLE && (
                <div className="flex items-center mt-1">
                  <div className="w-6 h-6 flex flex-col items-center justify-center">
                    <ErrorSvg />
                  </div>
                  <p className="text-mc-1 text-gray-700">
                    {getWarningText(item.state)}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>

        <hr className="border-gray-200" />
        <p className="text-mb-1 text-gray-900 text-right">
          총 {formatNumber(order.totalPrice)}원
        </p>
        <button
          disabled={reorderDisabled}
          onClick={onReorder}
          className="disabled:text-gray-400 text-mb-5 text-gray-700 bg-gray-100 rounded-2xl h-11"
        >
          같은 메뉴 주문하기
        </button>
      </div>
    </li>
  );
}
