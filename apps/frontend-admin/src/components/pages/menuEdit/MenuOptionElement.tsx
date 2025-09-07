import TextInput from '@/components/common/inputs/TextInput';
import GrapIcon from '@public/icons/ic_dots.svg';
import DeleteIcon from '@public/icons/ic_trashcan.svg';
import { HTMLAttributes, PropsWithChildren } from 'react';

interface MenuOptionElementProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {
  optionId: number;
  name: string;
  price: number;
  onNameChange?: (newName: string) => void;
  onPriceChange?: (newPrice: number) => void;
  onDelete?: () => void;
}

export default function MenuOptionElement({
  optionId,
  name,
  price,
  onNameChange,
  onPriceChange,
  onDelete,
  children,
  ...props
}: MenuOptionElementProps) {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = parseInt(value) || 0;
    onPriceChange?.(numericValue);
  };

  return (
    <div className="flex w-full items-center justify-center gap-2" {...props}>
      <GrapIcon width={24} height={24} />

      <TextInput
        label=""
        placeholder="옵션 이름을 입력해주세요."
        value={name}
        onChange={(e) => onNameChange?.(e.target.value)}
        maxLength={20}
      />

      <TextInput
        label=""
        placeholder="가격을 입력해주세요."
        value={price.toString()}
        onChange={handlePriceChange}
        type="number"
      />

      <button
        className="bg-red-200 hover:bg-red-200/80 flex aspect-square h-12 w-12 items-center justify-center rounded-2xl transition"
        onClick={onDelete}
      >
        <DeleteIcon width={24} height={24} />
      </button>
    </div>
  );
}
