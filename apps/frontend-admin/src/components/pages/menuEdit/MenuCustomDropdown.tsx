import MenuCustomDropdownItem from './MenuCustomDropdownItem';
import { useEffect, useRef, useState } from 'react';

interface MenuCustomDropdownProps {
  options: string[];
  selectedOption: string;
  isStatus?: boolean;
  isNumbers?: boolean;
  onChange: (value: string) => void;
}

export default function MenuCustomDropdown({
  options,
  selectedOption,
  isStatus = false,
  isNumbers = false,
  onChange,
}: MenuCustomDropdownProps) {
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

  return (
    <div className="relative cursor-pointer" ref={selectRef}>
      <MenuCustomDropdownItem
        text={selectedOption ? `${selectedOption}` : '0'}
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative"
        isSelectedItem={true}
        isNumbers={isNumbers}
      />

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1 w-full min-w-max flex flex-col rounded-xl border border-gray-200 bg-white shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option.toString());
                setIsOpen(false);
              }}
              className="flex w-full shrink-0 cursor-pointer items-center py-2 hover:bg-gray-100 first:rounded-t-xl last:rounded-b-xl"
            >
              <MenuCustomDropdownItem
                text={`${option}`}
                isNumbers={isNumbers}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
