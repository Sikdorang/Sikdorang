import { TooltipModalPresenter } from './TooltipModalPresenter';
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
import { IToggleSwitch } from '@/types/model/menu';
import { EditModalFormData } from '@/types/request/modal';
import AddIcon from '@public/icons/ic_plus.svg';
import CloseIcon from '@public/icons/ic_x.svg';
import Image from 'next/image';
import React, { ReactNode, useState } from 'react';

interface EditModalProps {
  children: ReactNode;
}

export default function EditModal({ children }: EditModalProps) {
  const { isOpen, closeModal } = useEditModal();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={closeModal}
    >
      <div
        className={`relative max-h-[80vh] w-full max-w-4xl overflow-y-auto bg-white shadow-xl rounded-2xl p-8`}
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
  onSave: (data: EditModalFormData) => void;
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

interface EditFieldProps {
  label?: string;
  placeholder?: string;
}

export function EditModalTextInput({
  label,
  placeholder,
  field = 'name',
}: EditFieldProps & { field?: keyof EditModalFormData }) {
  const { formData, updateField } = useEditModal();

  return (
    <div className="mb-4">
      <TextInput
        label={label}
        placeholder={placeholder}
        value={(formData[field] as string) ?? ''}
        onChange={(e) => updateField(field, e.target.value)}
        maxLength={30}
      />
    </div>
  );
}

export function EditModaSelectInput({ label }: EditFieldProps) {
  const { formData, updateField } = useEditModal();
  const contents = [
    { id: 1, text: '전체', count: 1 },
    { id: 2, text: '한식', count: 3 },
    { id: 3, text: '중식', count: 2 },
    { id: 4, text: '일식', count: 4 },
    { id: 5, text: '양식', count: 1 },
  ];

  const [selected, setSelected] = useState(formData.category ?? 1);

  const handleSelect = (id: number) => {
    setSelected(id);
    updateField('category', id);
  };

  return (
    <div className="mb-4">
      <div className="mb-4 grow-1 text-mobile-body-l-semibold text-gray-900">
        {label}
      </div>
      <div className="flex gap-2">
        <div className="flex gap-2 grow-1">
          {contents.map((cat) => (
            <CategoryButton
              key={cat.id}
              text={cat.text}
              color={selected === cat.id ? 'black' : 'white'}
              size="small"
              width="fit"
              onClick={() => handleSelect(cat.id)}
            />
          ))}
        </div>
        <TooltipModalPresenter isTextInput={true}>
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
            onClick={() => {}}
          />
        </TooltipModalPresenter>
      </div>
    </div>
  );
}

export function EditModalImageInput({ label }: EditFieldProps) {
  const { formData, updateField } = useEditModal();

  return (
    <div className="mb-4 flex flex-col gap-4">
      <ImageInput
        images={formData.images}
        setImages={(imgs) => updateField('images', imgs)}
      />
    </div>
  );
}

export function EditModalOptionInput({ label }: EditFieldProps) {
  const { formData, updateField } = useEditModal();
  const [options, setOptions] = React.useState(formData.options);

  const handleAddOption = () => {
    setOptions((prev) => [
      ...prev,
      { id: Date.now().toString(), name: '', price: 0 },
    ]);
  };

  // push local state into context whenever it changes
  React.useEffect(() => updateField('options', options), [options]);

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
          onClick={handleAddOption}
        />
      </div>
      <OptionInput
        options={options}
        onOptionsChange={setOptions}
        optionName=""
        onOptionNameChange={() => {}}
        onDelete={() => {}}
        onAddOption={handleAddOption}
      />
    </div>
  );
}

interface EditToggleSwitchProps {
  label: string;
  toggleSwitchItems: IToggleSwitch[];
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
            isOn={item.value ?? false}
            onToggle={() => {}}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
}
