import {
  default as AddButton,
  default as CategoryButton,
  default as SaveButton,
} from '@/components/common/buttons/CtaButton';
import ToggleSwitch from '@/components/common/buttons/ToggleSwitch';
import ImageInput from '@/components/common/inputs/ImageInput';
import OptionInput from '@/components/common/inputs/OptionInput';
import TextInput from '@/components/common/inputs/TextInput';
import { useEditModal } from '@/contexts/EditModalContext';
import { IMenuOption } from '@/types/model/menu';
import AddIcon from '@public/icons/ic_plus.svg';
import CloseIcon from '@public/icons/ic_x.svg';
import Image from 'next/image';
import React, { ReactNode, useState } from 'react';

export default function EditModal({ children }: { children: ReactNode }) {
  const { isOpen, closeModal } = useEditModal();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={closeModal}
    >
      <div
        className="max-h-[80vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function EditModalHeader({
  children,
  onSave,
}: {
  children: ReactNode;
  onSave: (name: string) => void;
}) {
  const { closeModal, saveEdit } = useEditModal();

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="grow-1" />
        <button onClick={closeModal}>
          <Image src={CloseIcon} alt="close" width={12} height={12} />
        </button>
      </div>

      <div className="mb-6 flex items-center justify-between text-2xl font-bold">
        <span className="grow-1">{children}</span>
        <SaveButton
          text="변경사항 저장하기"
          color="gray"
          width="fit"
          size="medium"
          onClick={() => saveEdit(onSave)}
        />
      </div>
    </div>
  );
}

interface EditModalBodyProps {
  label?: string;
  placeholder?: string;
}

export function EditModalTextInput({ label, placeholder }: EditModalBodyProps) {
  const { name, setName } = useEditModal();

  return (
    <div className="mb-4">
      <TextInput
        label={label}
        placeholder={placeholder}
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={30}
      />
    </div>
  );
}

export function EditModaSelectInput({
  label,
  placeholder,
}: EditModalBodyProps) {
  const contents = [
    { id: 1, text: '전체', count: 1 },
    { id: 2, text: '한식', count: 3 },
    { id: 3, text: '중식', count: 2 },
    { id: 4, text: '일식', count: 4 },
    { id: 5, text: '양식', count: 1 },
  ];

  const [selectedContent, setSelectedContent] = useState(1);

  return (
    <div className="mb-4">
      <div className="grow-1 text-mobile-body-l-semibold mb-4 text-gray-900">
        {label}
      </div>
      <div className="flex gap-2">
        {contents.map((cat) => (
          <CategoryButton
            key={cat.id}
            text={cat.text}
            color={selectedContent === cat.id ? 'black' : 'white'}
            size="small"
            width="fit"
            right={
              <span className="text-mobile-body-s-semibold text-gray-200">
                {cat.count}
              </span>
            }
            onClick={() => setSelectedContent(cat.id)}
          />
        ))}
        <CategoryButton
          text="카테고리 추가"
          color="gray"
          size="small"
          width="fit"
          right={
            <span className="text-mobile-body-s-semibold text-gray-200">
              <Image src={AddIcon} alt="plus" />
            </span>
          }
        />
      </div>
    </div>
  );
}

export function EditModalImageInput({
  label,
  placeholder,
}: EditModalBodyProps) {
  const { name, setName } = useEditModal();

  return (
    <div className="mb-4 flex flex-col gap-4">
      <div className="flex">
        <div className="grow-1 text-mobile-body-l-semibold text-gray-900">
          {label}
        </div>
        <AddButton
          text="사진 추가하기"
          color="black"
          width="fit"
          size="small"
        />
      </div>
      <ImageInput images={[]} setImages={() => {}} />
    </div>
  );
}

export function EditModalOptionInput({
  label,
  placeholder,
}: EditModalBodyProps) {
  const [options, setOptions] = React.useState<IMenuOption[]>([]);

  const handleAddOption = () => {
    const newOption: IMenuOption = {
      id: Date.now().toString(),
      name: '',
      price: 0,
    };
    setOptions((prev) => [...prev, newOption]);
  };

  return (
    <div className="mb-4 flex flex-col gap-4">
      <div className="flex">
        <div className="grow-1 text-mobile-body-l-semibold text-gray-900">
          {label}
        </div>
        <AddButton
          text="옵션 추가하기"
          color="black"
          width="fit"
          size="small"
        />
      </div>
      <OptionInput
        options={options}
        onOptionsChange={setOptions}
        optionName={''}
        onOptionNameChange={() => {}}
        onDelete={() => {}}
        onAddOption={handleAddOption}
      />
    </div>
  );
}

interface ToggleSwitchItem {
  label: string;
  initialValue?: boolean;
}

interface EditToggleSwitchProps {
  label: string;
  toggleSwitchItems: ToggleSwitchItem[];
}

export function EditToggleSwitch({
  label,
  toggleSwitchItems,
}: EditToggleSwitchProps) {
  return (
    <div className="mb-4 flex flex-col gap-4">
      <div className="flex">
        <div className="grow-1 text-mobile-body-l-semibold text-gray-900">
          {label}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {toggleSwitchItems.map((item, idx) => (
          <ToggleSwitch
            key={item.label + idx}
            isOn={item.initialValue ?? false}
            onToggle={() => {}}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
}
