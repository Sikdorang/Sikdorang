import WeekTimeRange from './WeekTimeRange';
import WeekdaySelector from './WeekdaySelector';
import CtaButton from '@/components/common/buttons/CtaButton';
import MenuCustomDropdown from '@/components/pages/menuEdit/MenuCustomDropdown';

interface BusinessHoursProps {
  label?: string;
  labelClassName?: string;
}

export default function BusinessHours({
  label = '제목',
  labelClassName = '',
  ...rest
}: BusinessHoursProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="flex gap-2 grow-1">
          <div
            className={`text-mobile-body-l-semibold block text-gray-800 ${labelClassName}`}
          >
            {label}
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-gray-100 rounded-xl p-4">
        <div>정기 휴무일 설정</div>
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

      <div className="flex flex-col bg-gray-100 rounded-xl p-4">
        <div>영업 시간 설정</div>
        <div className="flex gap-4 mb-2">
          <CtaButton
            text="모든 영업 시간이 같아요"
            color="white"
            size="small"
          />
          <CtaButton text="요일별로 달라요" color="white" size="small" />
        </div>

        <WeekTimeRange />
      </div>
    </div>
  );
}
