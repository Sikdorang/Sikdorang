import TextInput from '../inputs/TextInput';
import Spinner from '../loading/Spinner';
import { TooltipModalPresenter } from './TooltipModalPresenter';
import CtaButton from '@/components/common/buttons/CtaButton';
import ToggleSwitch from '@/components/common/buttons/ToggleSwitch';
import ImageInput from '@/components/common/inputs/ImageInput';
import OptionInput from '@/components/common/inputs/OptionInput';
import { ERROR_MESSAGES } from '@/constants/messages';
import { useManageCategory } from '@/hooks/useManageCategory';
import { useManageMenu } from '@/hooks/useManageMenu';
import { IMenuDetailItem, IMenuImageItem } from '@/types/model/menu';
import AddIcon from '@public/icons/ic_plus.svg';
import CloseIcon from '@public/icons/ic_x.svg';
import { LexoRank } from 'lexorank';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';

export interface CreateMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateMenuModal({
  isOpen,
  onClose,
}: CreateMenuModalProps) {
  const { categories, isCategoriesLoading, createCategory, fetchCategories } =
    useManageCategory();
  const { menus, createMenus } = useManageMenu();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [detail, setDetail] = useState<IMenuDetailItem | null>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    isNew: false,
    isPopular: false,
    images: [],
    status: 'SALE',
    optionGroups: [],
  });
  const [categoryError, setCategoryError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = detail?.name.trim() && selectedCategoryId !== null;
  const handleCreateMenu = async () => {
    if (!detail || !selectedCategoryId || !isFormValid) return;

    setIsSubmitting(true);
    try {
      let newOrder: string;
      if (menus.length === 0) {
        newOrder = LexoRank.middle().toString();
      } else {
        const lastOrder = menus[menus.length - 1].order;
        newOrder = LexoRank.parse(lastOrder).genNext().toString();
      }

      const requestData = [
        {
          menu: detail.name,
          price: detail.price,
          categoryId: selectedCategoryId,
          status: detail.status,
          order: newOrder,
        },
      ];

      await createMenus(requestData);
      onClose();

      setDetail({
        id: 0,
        name: '',
        description: '',
        price: 0,
        isNew: false,
        isPopular: false,
        images: [],
        status: 'SALE',
        optionGroups: [],
      });
      setSelectedCategoryId(null);
    } catch (error) {
      console.error('메뉴 생성 실패:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (!isOpen) return null;
  if (!detail) {
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

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setDetail((d) => d && { ...d, categoryId });
  };

  const handleCreateCategory = async (inputText: string) => {
    if (categories.length >= 999) {
      setCategoryError(ERROR_MESSAGES.maximumCategoryError);
      return;
    }
    if (inputText === '') {
      setCategoryError(ERROR_MESSAGES.emptyCategoryError);
      return;
    }
    if (categories.some((cat) => cat.category === inputText)) {
      setCategoryError(ERROR_MESSAGES.duplicatedCategoryError);
      return;
    }

    let newOrder: string;
    if (categories.length === 0) {
      newOrder = LexoRank.middle().toString();
    } else {
      const lastOrder = categories[categories.length - 1].order;
      newOrder = LexoRank.parse(lastOrder).genNext().toString();
    }

    await createCategory(inputText, newOrder);

    fetchCategories();
    setCategoryError('');
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
              <Image src={CloseIcon} alt="close" width={12} height={12} />
            </button>
          </div>
          <div className="mb-6 flex items-center justify-between text-2xl font-bold">
            <span>메뉴 추가</span>
            <CtaButton
              text="추가하기"
              color={isFormValid ? 'yellow' : 'gray'}
              width="fit"
              size="medium"
              radius="lg"
              disabled={!isFormValid}
              onClick={handleCreateMenu}
            />
          </div>
        </div>

        <div className="mb-4">
          <TextInput
            label="메뉴명"
            placeholder="메뉴명을 입력해주세요."
            labelClassName="text-mb-1"
            value={detail.name}
            onChange={handleChangeText('name')}
            maxLength={20}
          />
        </div>

        <div className="mb-4">
          <TextInput
            label="가격"
            placeholder="가격을 입력해주세요."
            labelClassName="text-mb-1"
            value={detail.price}
            onChange={handleChangeText('price')}
            limitHide
          />
        </div>

        <div className="mb-4">
          <div className="mb-4 text-mb-1 text-gray-900">카테고리</div>
          <div className="flex gap-2">
            <div className="flex gap-2 flex-1">
              {isCategoriesLoading ? (
                <Spinner />
              ) : (
                categories.map((cat) => (
                  <CtaButton
                    key={cat.id}
                    text={cat.category}
                    color={selectedCategoryId === cat.id ? 'black' : 'white'}
                    size="small"
                    width="fit"
                    onClick={() => handleSelectCategory(cat.id)}
                  />
                ))
              )}
            </div>
            <TooltipModalPresenter
              isTextInput={true}
              onButtonClick={(inputText) => {
                handleCreateCategory(inputText);
              }}
            >
              <CtaButton
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

        <div className="mb-4">
          <TextInput
            label="메뉴 설명"
            placeholder="메뉴 설명을 입력해주세요."
            labelClassName="text-mb-1"
            value={detail.price}
            onChange={handleChangeText('price')}
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
