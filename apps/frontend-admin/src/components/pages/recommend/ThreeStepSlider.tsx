'use client';

import Image from 'next/image';
import React, { useState } from 'react';

interface ThreeStepSliderProps {
  value: 'left' | 'center' | 'right';
  onChange: (value: 'left' | 'center' | 'right') => void;
  leftLabel?: string;
  centerLabel?: string;
  rightLabel?: string;
  dislikeOptions?: string[];
}

export default function ThreeStepSlider({
  value,
  onChange,
  leftLabel = '완전 싫어요',
  centerLabel = '보통이에요',
  rightLabel = '완전 좋아요',
  dislikeOptions = ['술 지정하기', '소주', '맥주', '와인', '막걸리'],
}: ThreeStepSliderProps) {
  const [dislikeOption, setDislikeOption] = useState(dislikeOptions[0]);

  const getThumbPosition = () => {
    switch (value) {
      case 'left':
        return 'left-0';
      case 'center':
        return 'left-1/2 -translate-x-1/2';
      case 'right':
        return 'right-0';
    }
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const third = rect.width / 3;
    if (clickX < third) onChange('left');
    else if (clickX < third * 2) onChange('center');
    else onChange('right');
  };

  const headerText = {
    left: leftLabel,
    center: centerLabel,
    right: rightLabel,
  }[value];

  return (
    <div className="w-full space-y-4">
      <div
        className="relative h-10 bg-gray-100 rounded-full cursor-pointer"
        onClick={handleTrackClick}
      >
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow-lg border border-gray-400 rounded-full shadow-md transition-all duration-200 ${getThumbPosition()}`}
        />
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span
          className="cursor-pointer hover:text-gray-800 text-mb-3"
          onClick={() => onChange('left')}
        >
          {leftLabel}
          <div className="flex flex-col mt-2 p-2 w-full h-15 bg-gray-200 text-gray-500 text-mb-3 items-center justify-center text-center rounded-sm">
            지정되지
            <br /> 않았어요
          </div>
          <Image src={''} alt={''} />
        </span>
        <span
          className="cursor-pointer hover:text-gray-800 text-mb-3"
          onClick={() => onChange('center')}
        >
          {centerLabel}
          <div className="flex flex-col mt-2 p-2 w-full h-15 bg-gray-200 text-gray-500 text-mb-3 items-center justify-center text-center rounded-sm">
            지정되지
            <br /> 않았어요
          </div>
          <Image src={''} alt={''} />
        </span>
        <span
          className="cursor-pointer hover:text-gray-800 text-mb-3"
          onClick={() => onChange('right')}
        >
          {rightLabel}
          <div className="flex flex-col mt-2 p-2 w-full h-15 bg-gray-200 text-gray-500 text-mb-3 items-center justify-center text-center rounded-sm">
            지정되지
            <br /> 않았어요
          </div>
          <Image src={''} alt={''} />
        </span>
      </div>

      <div className="space-y-2">
        <div className="text-gray-800 font-medium">{headerText}</div>

        <div className="relative">
          <select
            className="w-full border border-gray-300 rounded-full py-3 px-4 pr-10 bg-white"
            value={dislikeOption}
            onChange={(e) => setDislikeOption(e.target.value)}
          >
            {dislikeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
