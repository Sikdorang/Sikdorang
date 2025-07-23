'use client';

import { TooltipModalPresenter } from '../../../../../components/common/modals/TooltipModalPresenter';
import {
  default as AddButton,
  default as CategoryButton,
  default as SaveButton,
} from '@/components/common/buttons/CtaButton';
import ToggleSwitch from '@/components/common/buttons/ToggleSwitch';
import ImageInput from '@/components/common/inputs/ImageInput';
import OptionInput from '@/components/common/inputs/OptionInput';
import TextInput from '@/components/common/inputs/TextInput';
import AddIcon from '@public/icons/ic_plus.svg';
import Image from 'next/image';

const categories = [
  { id: 1, text: '전체', count: 1 },
  { id: 2, text: '한식', count: 3 },
  { id: 3, text: '중식', count: 2 },
  { id: 4, text: '일식', count: 4 },
  { id: 5, text: '양식', count: 1 },
];
const toggleSwitchItems = [
  { label: '판매중', value: true },
  { label: '숨김', value: false },
  { label: '품절', value: false },
];

export default function MenuCardPage() {
  return (
    <div className="flex flex-col items-center items-center justify-center w-full">
      <div className="wrapper w-full">
        <div className="mb-6 flex items-center justify-between text-2xl font-bold gap-2">
          <div className="text-desktop-l-semibold grow-1">메뉴 수정</div>
          <SaveButton
            text="메뉴 삭제"
            color="red"
            width="fit"
            size="small"
            onClick={() => {}}
          />
          <SaveButton
            text="변경사항 저장하기"
            color="gray"
            width="fit"
            size="small"
            onClick={() => {}}
          />
        </div>

        <TextInput
          label="메뉴명"
          placeholder="메뉴명을 입력해주세요."
          value={''}
          onChange={() => {}}
          maxLength={30}
        />

        <TextInput
          label="가격"
          placeholder="가격을 입력해주세요."
          value={''}
          onChange={() => {}}
          maxLength={30}
        />

        <div>
          <div className="mb-4 grow-1 text-mobile-body-l-semibold text-gray-900">
            카테고리
          </div>
          <div className="flex gap-2">
            <div className="flex gap-2 grow-1">
              {categories.map((cat) => (
                <CategoryButton
                  key={cat.id}
                  text={cat.text}
                  color="white"
                  size="small"
                  width="fit"
                  onClick={() => {}}
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

        <TextInput
          label="메뉴 설명"
          placeholder="메뉴 설명을 입력해주세요."
          value={''}
          onChange={() => {}}
          maxLength={30}
        />

        <ImageInput images={[]} setImages={() => {}} />

        <div className="mb-4 flex flex-col gap-4">
          <div className="flex">
            <div className="grow-1 text-mobile-body-l-semibold text-gray-900">
              메뉴 옵션
            </div>
            <AddButton
              text="옵션 추가하기"
              color="black"
              width="fit"
              size="small"
              onClick={() => {}}
            />
          </div>
          <OptionInput
            options={[]}
            onOptionsChange={() => {}}
            optionName=""
            onOptionNameChange={() => {}}
            onDelete={() => {}}
            onAddOption={() => {}}
          />
        </div>

        <div className="mb-4 flex flex-col gap-4">
          <div className="flex">
            <div className="grow-1 text-mobile-body-l-semibold text-gray-900">
              메뉴 강조
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
        <div className="mb-4 flex flex-col gap-4">
          <div className="flex">
            <div className="grow-1 text-mobile-body-l-semibold text-gray-900">
              메뉴 강조
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
      </div>
    </div>
  );
}
