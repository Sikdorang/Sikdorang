import BaseButton from '@/components/common/BaseButton';
import ButtonWrapper from '@/components/common/ButtonWrapper';
import { formatNumber } from '@/utilities/format';

interface AddToCartButtonProps {
  totalPrice: number;
  quantity: number;
  disabled: boolean;
  addToCart: () => void;
}

export default function AddToCartButton({
  totalPrice,
  quantity,
  disabled = true,
  addToCart,
}: AddToCartButtonProps) {
  return (
    <ButtonWrapper>
      <BaseButton onClick={addToCart} disabled={disabled}>
        총 {formatNumber(totalPrice * quantity)}원 · 담기
      </BaseButton>
    </ButtonWrapper>
  );
}
