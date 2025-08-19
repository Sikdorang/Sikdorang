import TimeRangeInput from './TimeRangeInput';
import { useState } from 'react';

interface DayTimeRange {
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
}

interface WeekTimeRangeProps {
  isUniform: boolean;
}

const days = ['일', '월', '화', '수', '목', '금', '토'];

export default function WeekTimeRange({ isUniform }: WeekTimeRangeProps) {
  const [uniformTimeRange, setUniformTimeRange] = useState<DayTimeRange>();

  const [timeRanges, setTimeRanges] = useState<DayTimeRange[]>(
    Array(7).fill({
      startHour: '',
      startMinute: '',
      endHour: '',
      endMinute: '',
    }),
  );

  const handleStartHourChange = (index: number, value: string) => {
    setTimeRanges((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        startHour: value,
      };
      return copy;
    });
  };

  // 특정 요일의 startMinute 변경
  const handleStartMinuteChange = (index: number, value: string) => {
    setTimeRanges((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        startMinute: value,
      };
      return copy;
    });
  };

  // 특정 요일의 endHour 변경
  const handleEndHourChange = (index: number, value: string) => {
    setTimeRanges((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        endHour: value,
      };
      return copy;
    });
  };

  // 특정 요일의 endMinute 변경
  const handleEndMinuteChange = (index: number, value: string) => {
    setTimeRanges((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        endMinute: value,
      };
      return copy;
    });
  };

  return (
    <div className="space-y-4">
      {isUniform ? (
        <TimeRangeInput
          key="영업 시간 입력"
          label="영업 시간 입력"
          startHour={uniformTimeRange?.startHour || ''}
          startMinute={uniformTimeRange?.startMinute || ''}
          onStartHourChange={(val) => handleStartHourChange(0, val)}
          onStartMinuteChange={(val) => handleStartMinuteChange(0, val)}
          endHour={uniformTimeRange?.endHour || ''}
          endMinute={uniformTimeRange?.endMinute || ''}
          onEndHourChange={(val) => handleEndHourChange(0, val)}
          onEndMinuteChange={(val) => handleEndMinuteChange(0, val)}
        />
      ) : (
        <>
          {days.map((day, i) => (
            <TimeRangeInput
              key={day}
              label={day}
              startHour={timeRanges[i]?.startHour || ''}
              startMinute={timeRanges[i]?.startMinute || ''}
              onStartHourChange={(val) => handleStartHourChange(i, val)}
              onStartMinuteChange={(val) => handleStartMinuteChange(i, val)}
              endHour={timeRanges[i]?.endHour || ''}
              endMinute={timeRanges[i]?.endMinute || ''}
              onEndHourChange={(val) => handleEndHourChange(i, val)}
              onEndMinuteChange={(val) => handleEndMinuteChange(i, val)}
            />
          ))}
        </>
      )}
    </div>
  );
}
