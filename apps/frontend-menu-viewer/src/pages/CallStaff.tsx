import Header from '../components/common/\bHeader';
import ButtonWrapper from '../components/common/ButtonWrapper';
import { ROUTES } from '../constants/routes';
import { showCustomToast } from '../utils/showToast';
import BaseButton from '@/components/common/BaseButton';
import OutlineButton from '@/components/common/OutlineButton';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const callOptions = [
  { id: 'water', label: '물' },
  { id: 'spoon', label: '수저' },
  { id: 'side', label: '반찬 추가' },
  { id: 'plate', label: '앞 접시' },
  { id: 'etc', label: '기타 호출' },
];

export default function CallStaff() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="min-w-xs mx-auto flex h-full w-full flex-col">
      <Header title="호출하기" />
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
        {selectedId && (
          <ButtonWrapper>
            <BaseButton
              onClick={() => {
                showCustomToast({ icon: 'bell', message: '호출하기를 했어요' });
                navigate(ROUTES.STORES.DETAIL('123'), { replace: true });
              }}
              color="black"
            >
              호출하기
            </BaseButton>
          </ButtonWrapper>
        )}
      </div>
    </div>
  );
}
