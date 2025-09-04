import { UpdateMenuDetailsDto } from '../../../types/request/menu';
import Spinner from '../loading/Spinner';
import CtaButton from '@/components/common/buttons/CtaButton';
import ToggleSwitch from '@/components/common/buttons/ToggleSwitch';
import ImageInput from '@/components/common/inputs/ImageInput';
import OptionInput from '@/components/common/inputs/OptionInput';
import TextInput from '@/components/common/inputs/TextInput';
import { useManageMenu } from '@/hooks/useManageMenu';
import { IMenuDetailItem, IMenuImageItem } from '@/types/model/menu';
import CloseIcon from '@public/icons/ic_x.svg';
import { isEqual } from 'lodash';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';

export interface EditMenuModalProps {
  menuId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditMenuModal({
  menuId,
  isOpen,
  onClose,
}: EditMenuModalProps) {
  const {
    getMenuDetails,
    updateMenuDetails,
    updateMenuOptions,
    updateMenuImages,
    isDetailLoading,
  } = useManageMenu();

  const [detail, setDetail] = useState<IMenuDetailItem | null>(null);
  const [original, setOriginal] = useState<IMenuDetailItem | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      const data = await getMenuDetails(menuId);
      if (data) {
        setDetail(data);
        setOriginal(data);
      }
    })();
  }, [isOpen, menuId]);

  const hasChanges = useMemo(() => {
    if (!original || !detail) return false;

    // 기존 필드 비교
    const metaChanged = !isEqual(
      {
        new: original.isNew,
        popular: original.isPopular,
        description: original.description,
        status: original.status,
        optionGroups: original.optionGroups,
      },
      {
        new: detail.isNew,
        popular: detail.isPopular,
        description: detail.description,
        status: detail.status,
        optionGroups: detail.optionGroups,
      },
    );

    // 이미지 배열 비교 (id, order, url)
    const imagesChanged = !isEqual(
      original.images.map(({ id, image_url, order }) => ({
        id,
        image_url,
        order,
      })),
      detail.images.map(({ id, image_url, order }) => ({
        id,
        image_url,
        order,
      })),
    );

    return metaChanged || imagesChanged;
  }, [detail, original]);

  if (!isOpen) return null;
  if (isDetailLoading || !detail) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="bg-white p-8 rounded-xl">
          <Spinner />
        </div>
      </div>
    );
  }

  const handleChangeText =
    (field: keyof IMenuDetailItem) => (e: ChangeEvent<HTMLInputElement>) => {
      setDetail((d) => d && { ...d, [field]: e.target.value });
    };

  const handleChangeImages = (images: IMenuImageItem[]) => {
    setDetail((d) => d && { ...d, images });
  };

  const handleChangeOptions = (
    optionGroups: IMenuDetailItem['optionGroups'],
  ) => {
    setDetail((d) => d && { ...d, optionGroups });
  };

  const handleToggle = (field: 'isPopular' | 'status') => (value: any) => {
    setDetail((d) => d && { ...d, [field]: value });
  };

  const handleSave = async () => {
    if (!detail) return;

    const detailPayload: UpdateMenuDetailsDto = {
      new: detail.isNew,
      popular: detail.isPopular,
      description: detail.description,
      status: detail.status as 'SALE' | 'HIDDEN' | 'SOLDOUT',
    };

    const optionsPayload = {
      menuId,
      options: detail.optionGroups.map((group) => ({
        menuId,
        option: group.title,
        minOption: group.minSelectable,
        maxOption: group.maxSelectable,
        optionRequired: group.required,

        optionDetails: group.items.map((item) => ({
          menuOptionId: item.optionId,
          optionDetailId: item.optionDetailId,
          optionDetail: item.name,
          price: item.price,
        })),
      })),
    };

    await updateMenuDetails(menuId, detailPayload);
    //await updateMenuOptions(optionsPayload);
    await updateMenuImages(menuId, detail.images, detail.images);
    onClose();
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
        <div className="flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <div />
            <button onClick={onClose}>
              <CloseIcon width={12} height={12} />
            </button>
          </div>
          <div className="mb-6 flex items-center justify-between text-2xl font-bold">
            <span>세부사항 편집하기</span>
            <CtaButton
              text="변경사항 저장하기"
              color={hasChanges ? 'yellow' : 'gray'}
              width="fit"
              size="medium"
              radius="lg"
              onClick={() => detail && handleSave()}
              disabled={!hasChanges}
            />
          </div>
        </div>

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
            images={detail.images}
            setImages={(
              updater:
                | ((prev: IMenuImageItem[]) => IMenuImageItem[])
                | IMenuImageItem[],
            ) => {
              setDetail((prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  images:
                    typeof updater === 'function'
                      ? updater(prev.images || [])
                      : Array.isArray(updater)
                        ? updater
                        : prev.images || [],
                };
              });
            }}
          />
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2 text-mb-1 text-gray-800">
            메뉴 옵션
            <CtaButton
              text={
                detail.optionGroups.length == 0
                  ? '옵션 추가하기'
                  : '새로운 옵션 추가하기'
              }
              color="black"
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
            onOptionTitleChange={(groupId: string, newTitle: string) => {
              const updatedGroups = detail.optionGroups.map((group) =>
                group.groupId === groupId
                  ? { ...group, title: newTitle }
                  : group,
              );
              handleChangeOptions(updatedGroups);
            }}
            onAddOption={(groupId) => {
              const updated = detail.optionGroups.map((group) =>
                group.groupId === groupId
                  ? {
                      ...group,
                      items: [
                        ...group.items,
                        {
                          optionId: Date.now().toString(),
                          name: '',
                          price: 0,
                        },
                      ],
                    }
                  : group,
              );
              handleChangeOptions(updated);
            }}
          />
        </div>

        <div className="mb-4">
          <div className="mb-2 text-mb-1 text-gray-900">메뉴 강조</div>
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
          <div className="mb-2 text-mb-1 text-gray-900">판매 상태</div>
          <div className="flex gap-4">
            {[
              { label: '판매 중', value: 'SALE' },
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
