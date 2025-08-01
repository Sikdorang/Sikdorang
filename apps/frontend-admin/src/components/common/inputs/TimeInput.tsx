import React from 'react';

interface TimeInputProps {
  hour: string;
  minute: string;
  onHourChange: (value: string) => void;
  onMinuteChange: (value: string) => void;
}

export default function SplitTimeInput({
  hour,
  minute,
  onHourChange,
  onMinuteChange,
}: TimeInputProps) {
  const handleHour = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 2);
    if (v.length === 1) {
      if (Number(v) > 2) v = '2';
    } else if (v.length === 2) {
      if (Number(v) > 23) v = '23';
    }
    onHourChange(v);
  };

  const handleMinute = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 2);
    if (v.length === 1) {
      if (Number(v) > 5) v = '5';
    } else if (v.length === 2) {
      if (Number(v) > 59) v = '59';
    }
    onMinuteChange(v);
  };

  return (
    <div className="flex items-center justify-center w-full bg-white rounded-xl border border-gray-200 px-3 py-2">
      <input
        type="text"
        maxLength={2}
        inputMode="numeric"
        pattern="\d*"
        className="w-12 text-md text-center focus:border-gray-700 outline-none"
        value={hour}
        onChange={handleHour}
        placeholder="00"
        autoComplete="off"
      />
      <span className="text-md font-bold select-none">:</span>
      <input
        type="text"
        maxLength={2}
        inputMode="numeric"
        pattern="\d*"
        className="w-12 text-md text-center focus:border-gray-700 outline-none"
        value={minute}
        onChange={handleMinute}
        placeholder="00"
        autoComplete="off"
      />
    </div>
  );
}
