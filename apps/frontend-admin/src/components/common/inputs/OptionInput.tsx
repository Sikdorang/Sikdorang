import MenuCustomDropdown from '../../pages/menuEdit/MenuCustomDropdown';
import TextInput from './TextInput';
import AddElementButton from '@/components/common/buttons/CtaButton';
import ToggleSwitch from '@/components/common/buttons/ToggleSwitch';
import MenuOptionElement from '@/components/pages/menuEdit/MenuOptionElement';
import EmptyOptionIcon from '@public/icons/ic_dotted_plus.svg';
import CancelIcon from '@public/icons/ic_x.svg';
import Image from 'next/image';
import React from 'react';

interface Option {
  id: string;
  name: string;
  price?: number;
}

interface OptionInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  options?: Option[];
  onOptionsChange?: (options: Option[]) => void;
  onDelete?: () => void;
  onAddOption: () => void;
  optionName?: string;
  onOptionNameChange?: (name: string) => void;
}

export default function OptionInput({
  options = [],
  onOptionsChange,
  onDelete,
  onAddOption,
  optionName = '',
  onOptionNameChange,
}: OptionInputProps) {
  const hasOptions = options && options.length > 0;

  const EmptyPlaceholder = () => (
    <div className="flex flex-col items-center justify-center gap-4 px-4 py-12">
      <Image src={EmptyOptionIcon} alt="옵션 없음" width={50} height={50} />
      <div className="text-mobile-body-m-semibold mb-6 text-center text-gray-700">
        옵션이 아직 없어요.
        <br />
        옵션을 추가해주세요 !
      </div>
    </div>
  );

  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl bg-gray-100 p-8">
      {hasOptions ? (
        <>
          <div className="flex">
            <span className="grow"></span>
            <button
              onClick={onDelete}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-200"
            >
              <Image src={CancelIcon} alt="옵션 삭제" width={16} height={16} />
            </button>
          </div>

          <TextInput
            label="옵션 이름"
            placeholder="옵션 이름"
            value={optionName}
            onChange={(e) => onOptionNameChange?.(e.target.value)}
          />

          <div className="flex">
            <div className="grow-1"></div>
            <AddElementButton
              text="항목 추가하기"
              size="small"
              color="white"
              width="fit"
              onClick={onAddOption}
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            {hasOptions ? (
              options.map((option) => (
                <MenuOptionElement
                  key={option.id}
                  //option={option}
                  // onUpdate={(updatedOption) => {
                  //   const updatedOptions = options.map((opt) =>
                  //     opt.id === option.id ? updatedOption : opt,
                  //   );
                  //   onOptionsChange?.(updatedOptions);
                  // }}
                  // onDelete={() => {
                  //   const filteredOptions = options.filter(
                  //     (opt) => opt.id !== option.id,
                  //   );
                  //   onOptionsChange?.(filteredOptions);
                  // }}
                />
              ))
            ) : (
              <EmptyPlaceholder />
            )}
          </div>

          <div className="flex">
            <span className="grow"></span>
            <div className="flex flex-col items-end gap-4">
              <div className="flex justify-center items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                <div>옵션 선택 최대 제한</div>
                <MenuCustomDropdown
                  options={[1, 2, 3, 4]}
                  selectedOption={0}
                  onChange={function (value: string): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              </div>
              <ToggleSwitch
                isOn={false}
                onToggle={() => {}}
                label="주문시 옵션 필수 선택"
              />
            </div>
          </div>
        </>
      ) : (
        <EmptyPlaceholder />
      )}
    </div>
  );
}
