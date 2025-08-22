'use client';

import TextInput from '../../common/inputs/TextInput';
import MenuCustomFinderDropdownItem from './MenuCustomFinderDropdownItem';
import CheckedIcon from '@public/icons/ic_checked_circle.svg';
import SearchIcon from '@public/icons/ic_magnifier.svg';
import Image from 'next/image';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

export interface MenuOption {
  id: number;
  name: string;
}

export interface MenuCustomFinderDropdownHandle {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

interface MenuCustomFinderDropdownProps {
  options: MenuOption[];
  selectedOptions: number[];
  isStatus?: boolean;
  isNumbers?: boolean;
  onChange: (ids: number[]) => void;
  hideTrigger?: boolean;
}

const MenuCustomFinderDropdown = forwardRef<
  MenuCustomFinderDropdownHandle,
  MenuCustomFinderDropdownProps
>(
  (
    {
      options,
      selectedOptions,
      isStatus = false,
      isNumbers = false,
      onChange,
      hideTrigger = false,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const selectRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle: () => setIsOpen((prev) => !prev),
      }),
      [],
    );

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const filtered = options.filter((opt) =>
      (opt.name?.toLowerCase() ?? '').includes(searchText.toLowerCase()),
    );

    // 토글: id 기준
    const toggleOption = (opt: MenuOption) => {
      const next = selectedOptions.includes(opt.id)
        ? selectedOptions.filter((id) => id !== opt.id)
        : [...selectedOptions, opt.id];
      onChange(next);
    };

    // 트리거에 표시할 텍스트: 선택된 name 목록
    const triggerText =
      (selectedOptions || []).length > 0
        ? options
            .filter((opt) => selectedOptions.includes(opt.id))
            .map((opt) => opt.name)
            .join(', ')
        : '0';

    return (
      <div className="relative" ref={selectRef}>
        {!hideTrigger && (
          <MenuCustomFinderDropdownItem
            text={triggerText}
            isSelectedItem={true}
            isNumbers={isNumbers}
            onClick={() => setIsOpen((prev) => !prev)}
            className="relative"
          />
        )}

        {isOpen && (
          <div className="absolute top-full left-0 z-50 mt-1 w-full min-w-max max-w-xs flex flex-col rounded-xl border border-gray-200 bg-white shadow-lg">
            <div className="relative p-4">
              <TextInput
                limitHide
                value={searchText}
                onChange={(e) => setSearchText(e.currentTarget.value)}
              />
              {searchText === '' && (
                <Image
                  src={SearchIcon}
                  alt="검색"
                  width={30}
                  height={30}
                  className="absolute top-1/2 right-7 -translate-y-1/2 pointer-events-none"
                />
              )}
            </div>

            <div
              className={
                'flex flex-col ' +
                (filtered.length > 10 ? 'max-h-140 overflow-y-auto' : '')
              }
            >
              {filtered.map((option) => {
                const isSel = selectedOptions.includes(option.id);
                return (
                  <div
                    key={option.id}
                    onClick={() => toggleOption(option)}
                    className="flex w-full shrink-0 cursor-pointer items-center py-2 px-3 hover:bg-gray-100 first:rounded-t-xl last:rounded-b-xl"
                  >
                    {isSel ? (
                      <Image
                        src={CheckedIcon}
                        alt="checked"
                        className="mr-2 shrink-0"
                      />
                    ) : (
                      <div className="mr-2 h-6 w-6 shrink-0" />
                    )}
                    <MenuCustomFinderDropdownItem
                      text={option.name}
                      isSelectedItem={isSel}
                      isNumbers={isNumbers}
                    />
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <div className="p-3 text-center w-full text-gray-500 py-4">
                  검색 결과가 없습니다.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
);

MenuCustomFinderDropdown.displayName = 'MenuCustomFinderDropdown';
export default MenuCustomFinderDropdown;
