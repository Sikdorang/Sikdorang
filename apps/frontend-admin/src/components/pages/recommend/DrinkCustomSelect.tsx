import DrinkCustomLabel from './DrinkCustomLabel';
import CheckedIcon from '@public/icons/ic_checked_circle.svg';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface DrinkCustomSelectProps {
  options: string[];
  selectedOption: string;
  isStatus?: boolean;
  onChange: (value: string) => void;
}

export default function DrinkCustomSelect({
  options,
  selectedOption,
  isStatus = false,
  onChange,
}: DrinkCustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const labelRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const calculatePosition = () => {
    if (labelRef.current) {
      const labelRect = labelRef.current.getBoundingClientRect();
      setPosition({
        top: labelRect.top + window.scrollY,
        left: labelRect.right + window.scrollX + 10,
      });
    }
  };
  useEffect(() => {
    const handleResize = () => calculatePosition();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    calculatePosition();
  }, [selectedOption]);

  return (
    <div className="cursor-pointer" ref={selectRef}>
      <DrinkCustomLabel
        ref={labelRef}
        text={selectedOption || '카테고리 선택'}
        variant={isStatus ? undefined : 'default'}
        hover={true}
        isStatus={isStatus}
        onClick={() => {
          setIsOpen((prev) => !prev);
          calculatePosition();
        }}
        className="relative"
      />

      {isOpen &&
        createPortal(
          <div
            className={`absolute z-10 flex flex-col rounded-xl border border-gray-200 bg-white shadow-lg`}
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`flex w-full shrink-0 cursor-pointer items-center px-4 py-2 hover:bg-gray-100`}
              >
                {option === selectedOption ? (
                  <Image
                    src={CheckedIcon}
                    alt="checked"
                    className="mr-2 shrink-0"
                  />
                ) : (
                  <div className="mr-2 h-6 w-6 shrink-0"></div>
                )}
                <DrinkCustomLabel
                  text={option}
                  hover={false}
                  isStatus={isStatus}
                />
              </div>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
}
