import TextInput from '../../common/inputs/TextInput';
import CorkageSwitch from '@/components/common/buttons/ToggleSwitch';
import { useState } from 'react';

interface CorkageProps {
  label?: string;
  labelClassName?: string;
}

export default function Corkage({
  label = '제목',
  labelClassName = '',
  ...rest
}: CorkageProps) {
  const [isPaid, setIsPaid] = useState(true);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-2 grow-1">
          <div
            className={`text-mobile-body-l-semibold block text-gray-800 ${labelClassName}`}
          >
            {label}
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-gray-100 rounded-xl p-4">
        <CorkageSwitch
          label="가능"
          isOn={isPaid}
          onToggle={() => {
            setIsPaid(!isPaid);
          }}
        />

        <div
          className={`transition-all duration-300
    ${isPaid ? 'opacity-100 max-h-40 mt-2' : 'opacity-0 max-h-0 pointer-events-none'}
    overflow-hidden`}
        >
          <TextInput
            label="콜키지 가격"
            placeholder="유료일때만  입력해주세요"
          />
        </div>
      </div>
    </div>
  );
}
