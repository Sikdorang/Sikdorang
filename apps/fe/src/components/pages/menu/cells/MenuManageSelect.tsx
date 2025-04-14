import React, { useState, useRef, useEffect } from 'react';

import MenuElementLabel from './MenuElementLabel';

import CheckedIcon from '@public/icons/ic_check.svg';

interface MenuManageSelectProps {
  options: string[];
  selectedOption: string;
  isStatus?: boolean;
  onChange: (value: string) => void;
}

export default function MenuManageSelect({
  options,
  selectedOption,
  isStatus = false,
  onChange,
}: MenuManageSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const calculateLeftPosition = (text: string) => {
    const fontSize = 16;
    const averageCharacterWidth = fontSize * 1;
    return (text.length / 2) * averageCharacterWidth + 4;
  };

  const leftPosition = calculateLeftPosition(selectedOption || '카테고리 선택');

  return (
    <div className="relative inline-block w-full cursor-pointer" ref={selectRef}>
      <MenuElementLabel
        text={selectedOption || '카테고리 선택'}
        variant={isStatus ? undefined : 'default'}
        hover={true}
        isStatus={isStatus}
        onClick={() => setIsOpen((prev) => !prev)}
      />

      {isOpen && (
        <div
          className="absolute z-10 top-0 w-full bg-white border border-gray-200 rounded shadow-lg"
          style={{ left: `calc(50% + ${leftPosition}px)` }}
        >
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`flex items-center w-full px-4 py-2 cursor-pointer hover:bg-gray-100`}
            >
              {option === selectedOption ? <CheckedIcon className="mr-2" /> : <div className="w-3 h-3 mr-2"></div>}
              <MenuElementLabel text={option} hover={false} isStatus={isStatus} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
