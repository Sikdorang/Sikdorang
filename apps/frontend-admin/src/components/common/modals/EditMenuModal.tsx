import CtaButton from '@/components/common/buttons/CtaButton';
import ToggleSwitch from '@/components/common/buttons/ToggleSwitch';
import ImageInput from '@/components/common/inputs/ImageInput';
import OptionInput from '@/components/common/inputs/OptionInput';
import TextInput from '@/components/common/inputs/TextInput';
import { useManageMenu } from '@/hooks/useManageMenu';
import { IMenuDetailResponse } from '@/types/model/menu';
import CloseIcon from '@public/icons/ic_x.svg';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';

export interface EditMenuModalProps {
  menuId: number;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<IMenuDetailResponse>) => void;
}

export default function EditMenuModal({
  menuId,
  isOpen,
  onClose,
  onSave,
}: EditMenuModalProps) {
  const { getMenuDetails, isDetailLoading } = useManageMenu();
  const [detail, setDetail] = useState<IMenuDetailResponse | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      const data = await getMenuDetails(menuId);
      if (data) setDetail(data);
    })();
  }, [isOpen, menuId]);

  if (!isOpen) return null;
  if (isDetailLoading || !detail) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="bg-white p-8 rounded-xl">로딩 중…</div>
      </div>
    );
  }

  const handleChangeText =
    (field: keyof IMenuDetailResponse) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setDetail((d) => d && { ...d, [field]: e.target.value });
    };

  const handleChangeImages = (images: string[]) => {
    setDetail((d) => d && { ...d, images });
  };

  const handleChangeOptions = (
    optionGroups: IMenuDetailResponse['optionGroups'],
  ) => {
    setDetail((d) => d && { ...d, optionGroups });
  };

  const handleToggle = (field: 'isPopular' | 'status') => (value: any) => {
    setDetail((d) => d && { ...d, [field]: value });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={onClose}
    >
      <div
        className="relative max-h-[80vh] w-full max-w-4xl overflow-y-auto bg-white shadow-xl rounded-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <div />
            <button onClick={onClose}>
              <Image src={CloseIcon} alt="close" width={12} height={12} />
            </button>
          </div>
          <div className="mb-6 flex items-center justify-between text-2xl font-bold">
            <span>세부사항 편집하기</span>
            <CtaButton
              text="변경사항 저장하기"
              color="gray"
              width="fit"
              size="medium"
              radius="lg"
              onClick={() => detail && onSave(detail)}
            />
          </div>
        </div>

        {/* Inputs */}
        <div className="mb-4">
          <TextInput
            label="메뉴 설명"
            placeholder="메뉴설명을 입력해주세요."
            value={detail.description}
            onChange={handleChangeText('description')}
            maxLength={200}
          />
        </div>

        <div className="mb-4">
          <ImageInput
            label="메뉴 이미지"
            placeholder="메뉴이미지를 추가해주세요."
            images={detail.images}
            setImages={handleChangeImages}
          />
        </div>

        <div className="mb-4">
          <div className="flex justify-between mb-2 text-mobile-body-l-semibold text-gray-900">
            메뉴 옵션
            <CtaButton
              text="옵션 추가하기"
              color="gray"
              width="fit"
              size="small"
              radius="lg"
              onClick={() => {
                const newGroups = [
                  ...detail.optionGroups,
                  {
                    groupId: Date.now().toString(),
                    title: '',
                    required: false,
                    minSelectable: 0,
                    maxSelectable: 1,
                    items: [],
                  },
                ];
                handleChangeOptions(newGroups);
              }}
            />
          </div>
          <OptionInput
            options={detail.optionGroups}
            onOptionsChange={handleChangeOptions}
          />
        </div>

        <div className="mb-4">
          <div className="mb-2 text-mobile-body-l-semibold text-gray-900">
            메뉴 강조
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ToggleSwitch
              label="인기 메뉴로 표시"
              isOn={detail.isPopular}
              onToggle={() => handleToggle('isPopular')(!detail.isPopular)}
            />
            <ToggleSwitch
              label="신 메뉴로 표시"
              isOn={detail.isNew}
              onToggle={() => setDetail((d) => d && { ...d, isNew: !d.isNew })}
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="mb-2 text-mobile-body-l-semibold text-gray-900">
            판매 상태
          </div>
          <div className="flex gap-4">
            {[
              { label: '판매중', value: 'SALE' },
              { label: '숨김', value: 'HIDDEN' },
              { label: '품절', value: 'SOLDOUT' },
            ].map((opt) => (
              <ToggleSwitch
                key={opt.value}
                label={opt.label}
                isOn={detail.status === opt.value}
                onToggle={() => handleToggle('status')(opt.value)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
