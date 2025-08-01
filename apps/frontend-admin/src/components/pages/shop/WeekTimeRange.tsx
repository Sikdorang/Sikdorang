import TimeRangeInput from './TimeRangeInput';
import { useState } from 'react';

interface DayTimeRange {
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
}

const days = ['일', '월', '화', '수', '목', '금', '토'];

export default function WeekTimeRange() {
  // 7일분 각각 시간을 배열로 관리, 초기값은 빈 문자열로 세팅
  const [timeRanges, setTimeRanges] = useState<DayTimeRange[]>(
    Array(7).fill({
      startHour: '',
      startMinute: '',
      endHour: '',
      endMinute: '',
    }),
  );

  // 특정 요일의 startHour 변경
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
    </div>
  );
}
