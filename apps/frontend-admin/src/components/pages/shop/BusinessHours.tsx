import WeekTimeRange from './WeekTimeRange';
import WeekdaySelector from './WeekdaySelector';
import CtaButton from '@/components/common/buttons/CtaButton';
import MenuCustomDropdown from '@/components/pages/menuEdit/MenuCustomDropdown';
import { useState } from 'react';

interface BusinessHoursProps {
  label?: string;
  labelClassName?: string;
}

export default function BusinessHours({
  label = '제목',
  labelClassName = '',
  ...rest
}: BusinessHoursProps) {
  const [isUniformHours, setIsUniformHours] = useState<boolean>(true);

  // uniformHoursValue: 공통 시간 값
  const [uniformHoursValue, setUniformHoursValue] = useState<string>('');

  // weekHours: 요일별 시간 값, 예시로 요일별 문자열 맵
  const [weekHours, setWeekHours] = useState<Record<string, string>>({
    mon: '',
    tue: '',
    wed: '',
    thu: '',
    fri: '',
    sat: '',
    sun: '',
  });

  const handleUniformClick = () => setIsUniformHours(!isUniformHours);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="flex gap-2 grow-1">
          <div className={`text-mb-1 block text-gray-800 ${labelClassName}`}>
            {label}
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-gray-100 rounded-xl p-4 gap-2">
        <div className="text-mb-1">정기 휴무일 설정</div>
        <div className="flex gap-4">
          <MenuCustomDropdown
            options={['매주', '매달', '매년']}
            selectedNumber={0}
            onChange={function (value: string): void {
              throw new Error('Function not implemented.');
            }}
          />
          <WeekdaySelector />
          <CtaButton text="없음" color="white" size="small" width="fit" />
        </div>
      </div>

      <div className="flex flex-col bg-gray-100 rounded-xl p-4 gap-2">
        <div className="text-mb-1">영업 시간 설정</div>
        <div className="flex gap-4 mb-2">
          <CtaButton
            text="모든 영업 시간이 같아요"
            color={isUniformHours ? 'black' : 'white'}
            size="small"
            onClick={handleUniformClick}
          />
          <CtaButton
            text="요일별로 달라요"
            color={isUniformHours ? 'white' : 'black'}
            size="small"
            onClick={handleUniformClick}
          />
        </div>

        <WeekTimeRange isUniform={isUniformHours} />
      </div>
    </div>
  );
}
