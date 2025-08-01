import TimeInput from '@/components/common/inputs/TimeInput';

interface TimeRangeInputProps {
  label: string;

  startHour: string;
  startMinute: string;
  onStartHourChange: (value: string) => void;
  onStartMinuteChange: (value: string) => void;

  endHour: string;
  endMinute: string;
  onEndHourChange: (value: string) => void;
  onEndMinuteChange: (value: string) => void;
}

export default function TimeRangeInput({
  label,

  startHour,
  startMinute,
  onStartHourChange,
  onStartMinuteChange,

  endHour,
  endMinute,
  onEndHourChange,
  onEndMinuteChange,
}: TimeRangeInputProps) {
  return (
    <div className="flex gap-2 justify-center items-center">
      <div className="whitespace-nowrap font-medium">{label}</div>

      <TimeInput
        hour={startHour}
        minute={startMinute}
        onHourChange={onStartHourChange}
        onMinuteChange={onStartMinuteChange}
      />

      <div>-</div>

      <TimeInput
        hour={endHour}
        minute={endMinute}
        onHourChange={onEndHourChange}
        onMinuteChange={onEndMinuteChange}
      />
    </div>
  );
}
