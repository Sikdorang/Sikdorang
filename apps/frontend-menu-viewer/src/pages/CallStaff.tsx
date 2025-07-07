import ChervonSvg from '@/assets/icons/ic_chervon_left.svg?react';
import BaseButton from '@/components/common/BaseButton';
import OutlineButton from '@/components/common/OutlineButton';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const callOptions = [
  { id: 'water', label: '물' },
  { id: 'spoon', label: '수저' },
  { id: 'side', label: '반찬 추가' },
  { id: 'plate', label: '앞 접시' },
];

export default function CallStaff() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="min-w-xs mx-auto flex h-full w-full flex-col">
      <div className="sticky top-0 z-10 h-12 bg-white shadow-sm">
        <div className="wrapper flex items-center text-gray-700">
          <button onClick={() => navigate(-1)}>
            <ChervonSvg />
          </button>
          <p className="text-mb-5">호출하기</p>
        </div>
      </div>
      <div className="wrapper flex w-full flex-1 flex-col pb-7 pt-6">
        <div className="mb-6 w-full flex-1">
          <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
            {callOptions.map((option) => (
              <OutlineButton
                key={option.id}
                isSelected={selectedId === option.id}
                onClick={() => setSelectedId(option.id)}
              >
                {option.label}
              </OutlineButton>
            ))}
          </div>
        </div>
        {selectedId && <BaseButton>호출하기</BaseButton>}
      </div>
    </div>
  );
}
