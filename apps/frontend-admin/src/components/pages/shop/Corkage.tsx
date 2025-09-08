import TextInput from '../../common/inputs/TextInput';
import CorkageSwitch from '@/components/common/buttons/ToggleSwitch';
import { useEffect, useState } from 'react';

interface CorkageProps {
  label?: string;
  labelClassName?: string;
  value: string;
  onChange: (possible: boolean, price: number) => void;
}

export default function Corkage({
  label = '제목',
  labelClassName = '',
  value,
  onChange,
}: CorkageProps) {
  const [isPossible, setIsPossible] = useState(false);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (value.startsWith('가능')) {
      const parts = value.split(' ');
      setIsPossible(true);
      setPrice(parts.length > 1 ? Number(parts[1]) : 0);
    } else {
      setIsPossible(false);
      setPrice(0);
    }
  }, [value]);

  // 2) 사용자가 토글 클릭했을 때만 onChange 호출
  const handleToggle = () => {
    const next = !isPossible;
    setIsPossible(next);
    // 불가→가능 또는 가능→불가 시 즉시 부모에 알림
    onChange(next, price);
  };

  // 3) 사용자가 가격 입력할 때만 onChange 호출
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextPrice = Number(e.target.value);
    setPrice(nextPrice);
    if (isPossible) {
      onChange(true, nextPrice);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-2 grow-1">
          <div className={`text-mb-1 block text-gray-800 ${labelClassName}`}>
            {label}
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-gray-100 rounded-xl p-4">
        <CorkageSwitch
          label="가능"
          isOn={isPossible}
          onToggle={() => setIsPossible((prev) => !prev)}
        />

        <div
          className={`transition-all duration-300 ${
            isPossible
              ? 'opacity-100 max-h-40 mt-2'
              : 'opacity-0 max-h-0 pointer-events-none'
          } overflow-hidden`}
        >
          <TextInput
            label="콜키지 가격"
            labelClassName="text-mb-1"
            placeholder="유료일때만 입력해주세요"
            limitHide={true}
            value={price.toString()}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
