'use client';

import {
  default as CategoryButton,
  default as FilterOptionButton,
  default as TableControlButton,
} from '@/components/common/buttons/CtaButton';
import SearchInput from '@/components/common/inputs/TextInput';
import EditModal, {
  EditModalHeader,
  EditModalImageInput,
  EditModalOptionInput,
  EditModalTextInput,
  EditModaSelectInput,
  EditToggleSwitch,
} from '@/components/common/modals/EditModal';
import { TooltipModalPresenter } from '@/components/common/modals/TooltipModalPresenter';
import {
  default as DeleteMenuModal,
  WarningModalActions,
  WarningModalBody,
  WarningModalHeader,
} from '@/components/common/modals/WarningModal';
import MenuGalleryCardSkeleton from '@/components/pages/menuEdit/MenuCardSkeleton';
import MenuGalleryCard from '@/components/pages/menuEdit/MenuGalleryCard';
import MenuTableRow from '@/components/pages/menuEdit/MenuTableRow';
import { ERROR_MESSAGES } from '@/constants/messages';
import { useEditModal } from '@/contexts/EditModalContext';
import { useWarningModal } from '@/contexts/WarningModalContext';
import { useManageCategory } from '@/hooks/useManageCategory';
import { IMenuTableItem } from '@/types/model/menu';
import GalleryIcon from '@public/icons/ic_grid.svg';
import TableIcon from '@public/icons/ic_list.svg';
import AddIcon from '@public/icons/ic_plus.svg';
import { LexoRank } from 'lexorank';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const filterOptions = [
  { id: 1, text: '전체' },
  { id: 2, text: '판매중만 보기' },
  { id: 3, text: '품절만 보기' },
  { id: 4, text: '숨김만 보기' },
  { id: 5, text: '미입력만 보기' },
];

export default function MenuEditPage() {
  const {
    categories,
    isCategoriesLoading,
    createCategory,
    fetchCategories,
    updateCategory,
    removeCategory,
  } = useManageCategory();

  const [menuItems, setMenuItems] = useState<IMenuTableItem[]>([
    {
      id: 1,
      name: '참소라 무침',
      price: 25000,
      category: '안주',
      status: '판매 중',
      checked: false,
      order: '1',
    },
    {
      id: 2,
      name: '아롱사태 수육',
      price: 25000,
      category: '안주',
      status: '품절',
      checked: true,
      order: '1',
    },
    {
      id: 3,
      name: '앞다리살 수육',
      price: 25000,
      category: '안주',
      status: '숨김',
      checked: true,
      order: '1',
    },
  ]);

  useEffect(() => {
    fetchCategories();
  }, []);
  const [inputCategory, setInputCategory] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const [viewType, setViewType] = useState<'table' | 'gallery'>('table');

  const { openModal, currentModal } = useEditModal();
  const [isTooltipModal, setIsTooltipModal] = useState(false);
  const handleEdit = () => {
    setIsTooltipModal(false);
    openModal('modifyMenu');
  };

  const handleCreate = () => {
    setIsTooltipModal(false);
    openModal('createMenu');
  };

  const handleCheckbox = (menuId: number) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === menuId ? { ...item, checked: !item.checked } : item,
      ),
    );
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

  const { openModal: openDeleteMenuModal } = useWarningModal();
  // 삭제 버튼 클릭
  const handleDelete = (menuId: number) => {
    openDeleteMenuModal(String(menuId));
    // setCategories((prevCategories) => {
    //   return prevCategories.filter((category) => {
    //     if (category.id === categoryId) return false;
    //     if (category.children) {
    //       category.children = category.children.filter(
    //         (child) => child.id !== categoryId,
    //       );
    //     }
    //     return true;
    //   });
    // });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="wrapper flex w-full flex-col items-center justify-center py-4">
        <SearchInput
          label="메뉴 편집"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClear={() => setSearchValue('')}
          placeholder="찾으시는 메뉴가 있으신가요?"
          maxLength={50}
          disabled={false}
        />

        <div className="flex w-full gap-2">
          <div className="grow-1 flex gap-2">
            {isCategoriesLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-10 w-18 rounded-full bg-gray-200 animate-pulse"
                />
              ))
            ) : (
              <>
                <CategoryButton
                  key="all"
                  text="전체"
                  color={selectedCategory === 'all' ? 'black' : 'white'}
                  size="small"
                  width="fit"
                  onClick={() => setSelectedCategory('all')}
                  radius="full"
                  right={
                    <div className="text-mb-5 text-gray-200">
                      {categories.length}
                    </div>
                  }
                />
                {categories.map((cat) => (
                  <CategoryButton
                    key={cat.id}
                    text={cat.category}
                    color={selectedCategory === cat.id ? 'black' : 'white'}
                    size="small"
                    radius="full"
                    width="fit"
                    onClick={() => setSelectedCategory(cat.id)}
                  />
                ))}
              </>
            )}
          </div>
          <TooltipModalPresenter
            isTextInput={true}
            onButtonClick={(inputText) => {
              handleCreateCategory(inputText);
            }}
          >
            <CategoryButton
              text="카테고리 추가"
              color="gray"
              size="small"
              width="fit"
              radius="full"
              right={
                <span>
                  <Image src={AddIcon} width={16} height={16} alt="plus" />
                </span>
              }
            />
          </TooltipModalPresenter>
        </div>
      </div>

      <div className="w-full border-b border-gray-100" />

      <div className="wrapper w-full p-4">
        <div className="flex gap-2 mb-6">
          <div className="grow-1 flex items-center gap-2 ">
            <div className="text-mh-1 flex gap-2">
              <div className="text-gray-800">전체</div>
              <div className="text-gray-600">13</div>
            </div>
            <button
              className={`rounded-md px-2 py-2 ${
                viewType === 'table' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
              onClick={() => setViewType('table')}
            >
              <Image src={TableIcon} alt="table" />
            </button>
            <button
              className={`rounded-md px-2 py-2 ${
                viewType === 'gallery' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
              onClick={() => setViewType('gallery')}
            >
              <Image src={GalleryIcon} alt="gallery" />
            </button>
          </div>

          {viewType === 'table' ? (
            <>
              <TableControlButton
                text="메뉴 추가하기"
                color="white"
                size="small"
                width="fit"
                radius="xl"
                onClick={handleCreate}
              />
              <TableControlButton
                text="삭제하기"
                color="gray"
                size="small"
                radius="xl"
                width="fit"
              />
              <TableControlButton
                text="변경사항 저장하기"
                color="gray"
                size="small"
                radius="xl"
                width="fit"
              />
            </>
          ) : (
            <TableControlButton
              text="메뉴 추가하기"
              color="yellow"
              size="small"
              width="fit"
              radius="xl"
              onClick={handleCreate}
            />
          )}
        </div>
        <div className="flex gap-4 pt-2">
          {filterOptions.map((option) => (
            <FilterOptionButton
              key={option.id}
              text={option.text}
              color="white"
              size="small"
              width="fit"
              radius="full"
            />
          ))}
        </div>
      </div>

      <div className="wrapper w-full p-4">
        {viewType === 'table' ? (
          <>
            <table className="w-full table-auto border-separate border-spacing-0 overflow-hidden rounded-xl">
              <thead className="text-mb-3 text-white rounded-lg border-b border-b-gray-400 bg-gray-800">
                <tr>
                  <th className="w-[3%] whitespace-nowrap rounded-tl-xl px-5 py-5"></th>
                  <th className="w-[35%] whitespace-nowrap px-5 py-5 text-left">
                    메뉴명
                  </th>
                  <th className="w-[10%] whitespace-nowrap px-5 py-5 text-left">
                    가격
                  </th>
                  <th className="w-[12%] whitespace-nowrap px-5 py-5 text-left">
                    카테고리
                  </th>
                  <th className="w-[10%] whitespace-nowrap px-5 py-5 text-left">
                    상태
                  </th>
                  <th className="w-[8%] whitespace-nowrap rounded-tr-xl px-5 py-5">
                    세부사항
                  </th>
                </tr>
              </thead>
              <tbody className="text-mb-4 rounded-t-none rounded-bl-xl rounded-br-xl border border-t-0 text-gray-600">
                {menuItems.map((item, idx) => (
                  <MenuTableRow
                    key={item.id}
                    item={item}
                    onEdit={handleEdit}
                    onCheck={handleCheckbox}
                    isLastRow={idx === menuItems.length - 1}
                  />
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4">
              {isLoading
                ? menuItems.map((_, idx) => (
                    <MenuGalleryCardSkeleton key={idx} />
                  ))
                : menuItems.map((item) => (
                    <MenuGalleryCard
                      key={item.id}
                      onDelete={handleDelete}
                      item={{
                        id: 0,
                        tags: ['인기', '신메뉴'],
                        name: '아아',
                        price: '100',
                      }}
                    />
                  ))}
            </div>
          </>
        )}
      </div>

      {currentModal !== null && (
        <EditModal>
          {currentModal === 'modifyMenu' && (
            <>
              <EditModalHeader onSave={() => {}}>
                세부사항 편집하기
              </EditModalHeader>
              <EditModalTextInput
                label="메뉴 설명"
                placeholder="메뉴설명을 입력해주세요."
              />
              <EditModalImageInput
                label="메뉴 이미지"
                placeholder="메뉴이미지를 추가해주세요."
              />
              <EditModalOptionInput
                label="메뉴 옵션"
                placeholder="옵션을 추가해주세요."
              />
              <EditToggleSwitch
                label="메뉴 강조"
                toggleSwitchItems={[
                  { label: '인기 메뉴로 표시', value: true },
                  { label: '신 메뉴로 표시', value: false },
                ]}
              />
              <EditToggleSwitch
                label="판매중"
                toggleSwitchItems={[
                  { label: '판매중', value: true },
                  { label: '숨김', value: false },
                  { label: '품절', value: false },
                ]}
              />
            </>
          )}

          {currentModal === 'createMenu' && (
            <>
              <EditModalHeader onSave={() => {}}>메뉴 추가하기</EditModalHeader>
              <EditModalTextInput
                label="메뉴명"
                placeholder="메뉴명을 입력해주세요."
              />
              <EditModalTextInput
                label="가격"
                placeholder="가격을 입력해주세요."
              />
              <EditModaSelectInput
                label="카테고리"
                placeholder="카테고리를 선택해주세요."
              />
              <EditModalImageInput
                label="메뉴 이미지"
                placeholder="메뉴이미지를 추가해주세요."
              />
              <EditModalOptionInput
                label="메뉴 옵션"
                placeholder="옵션을 추가해주세요."
              />
              <EditToggleSwitch
                label="메뉴 강조"
                toggleSwitchItems={[
                  { label: '인기 메뉴로 표시', value: true },
                  { label: '신 메뉴로 표시', value: false },
                ]}
              />
              <EditToggleSwitch
                label="판매중"
                toggleSwitchItems={[
                  { label: '판매중', value: true },
                  { label: '숨김', value: false },
                  { label: '품절', value: false },
                ]}
              />
            </>
          )}
        </EditModal>
      )}

      <DeleteMenuModal>
        <WarningModalHeader>메뉴 삭제</WarningModalHeader>
        <WarningModalBody>
          메뉴를 정말 삭제할까요 ?
          <br />한 번 삭제하면 복구할 수 없어요 !
        </WarningModalBody>
        <WarningModalActions onConfirm={() => {}} />
      </DeleteMenuModal>
    </div>
  );
}
