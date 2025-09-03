import MenuCustomLabel from './MenuCustomLabel';
import CheckedIcon from '@public/icons/ic_checked_circle.svg';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Option {
  id: number;
  label: string;
}

interface MenuCustomSelectProps {
  options: Option[];
  selectedId: number;
  isStatus?: boolean;
  onChange: (id: number) => void;
}

export default function MenuCustomSelect({
  options,
  selectedId,
  isStatus = false,
  onChange,
}: MenuCustomSelectProps) {
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
    //document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('click', handleClickOutside);
    return () => {
      //document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('click', handleClickOutside);
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
  }, [selectedId]);

  return (
    <div className="cursor-pointer" ref={selectRef}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
          calculatePosition();
        }}
      >
        <MenuCustomLabel
          ref={labelRef}
          text={
            selectedId
              ? options.find((opt) => opt.id === selectedId)?.label ||
                '선택하세요'
              : '선택하세요'
          }
          variant={isStatus ? undefined : 'default'}
          hover={true}
          isStatus={isStatus}
          className="relative"
        />
      </div>

      {isOpen &&
        createPortal(
          <div
            className="absolute z-10 flex flex-col rounded-xl border border-gray-200 bg-white shadow-lg"
            style={{ top: `${position.top}px`, left: `${position.left}px` }}
            onClick={(e) => e.stopPropagation()}
          >
            {options.map((opt) => (
              <div
                key={opt.id}
                onClick={() => {
                  onChange(opt.id);
                  setIsOpen(false);
                }}
                className="flex w-full cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
              >
                {opt.id === selectedId ? (
                  <CheckedIcon className="mr-2" />
                ) : (
                  <div className="mr-2 h-6 w-6" />
                )}
                <MenuCustomLabel
                  text={opt.label}
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
