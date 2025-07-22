import BaseButton from '@/components/common/BaseButton';
import ButtonWrapper from '@/components/common/ButtonWrapper';
import { formatNumber } from '@/utilities/format';

interface Props {
  totalPrice: number;
  itemCount: number;
  onClick: () => void;
}

export default function StoreOrderButton({
  totalPrice,
  itemCount,
  onClick,
}: Props) {
  if (itemCount === 0) return null;

  return (
    <ButtonWrapper>
      <BaseButton onClick={onClick} color="black">
        <div className="flex items-center gap-2.5">
          <p className="flex items-center gap-1">
            <span>총 {formatNumber(totalPrice)}원</span>
            <p className="h-1 w-1 rounded-full bg-white" />
            <span>주문하기</span>
          </p>
          <p className="text-xs font-bold leading-[150%] tracking-[-2%] flex h-6 w-6 items-center justify-center rounded-full bg-white text-gray-800">
            {itemCount}
          </p>
        </div>
      </BaseButton>
    </ButtonWrapper>
  );
}
