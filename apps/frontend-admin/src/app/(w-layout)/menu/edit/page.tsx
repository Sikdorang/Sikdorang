'use client';

import {
  default as CategoryButton,
  default as FilterOptionButton,
  default as TableControlButton,
} from '@/components/common/buttons/CtaButton';
import SearchInput from '@/components/common/inputs/TextInput';
import EditMenuModal from '@/components/common/modals/EditMenuModal';
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
import MenuTableHeader from '@/components/pages/menuEdit/MenuTableHeader';
import MenuTableRow from '@/components/pages/menuEdit/MenuTableRow';
import MenuTableRowSkeleton from '@/components/pages/menuEdit/MenuTableRowSkeleton';
import { ERROR_MESSAGES } from '@/constants/messages';
import { useEditModal } from '@/contexts/EditModalContext';
import { useWarningModal } from '@/contexts/WarningModalContext';
import { useManageCategory } from '@/hooks/useManageCategory';
import { useManageMenu } from '@/hooks/useManageMenu';
import { IMenuDetailResponse, IMenuTableItem } from '@/types/model/menu';
import { convertToMenuTableItems } from '@/utilities/reshape';
import GalleryIcon from '@public/icons/ic_grid.svg';
import TableIcon from '@public/icons/ic_list.svg';
import AddIcon from '@public/icons/ic_plus.svg';
import { LexoRank } from 'lexorank';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';

const filterOptions = [
  { id: 1, text: '전체' },
  { id: 2, text: '판매중만 보기' },
  { id: 3, text: '품절만 보기' },
  { id: 4, text: '숨김만 보기' },
  { id: 5, text: '미입력만 보기' },
];

export default function MenuEditPage() {
  const { categories, isCategoriesLoading, createCategory, fetchCategories } =
    useManageCategory();

  const {
    menus,
    isMenusLoading,
    menuError,
    fetchMenus,
    createMenus,
    updateMenus,
    removeMenu,
    getMenuDetails,
    updateMenuDetails,
  } = useManageMenu();

  useEffect(() => {
    fetchCategories();
    fetchMenus();
  }, []);

  const [categoryError, setCategoryError] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [menuFilter, setMenuFilter] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [viewType, setViewType] = useState<'table' | 'gallery'>('table');

  const { openModal, currentModal } = useEditModal();
  const [isTooltipModal, setIsTooltipModal] = useState(false);

  const handleCreate = () => {
    setIsTooltipModal(false);
    openModal('createMenu');
  };

  const totalMenuCount = menus.reduce(
    (acc, category) => acc + category.items.length,
    0,
  );

  const [selectedMenuIds, setSelectedMenuIds] = useState<number[]>([]);
  const handleCheckbox = (menuId: number) => {
    setSelectedMenuIds((prev) => {
      if (prev.includes(menuId)) {
        return prev.filter((id) => id !== menuId);
      }
      return [...prev, menuId];
    });
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

  const [menuTableItems, setMenuTableItems] = useState<IMenuTableItem[]>(() =>
    convertToMenuTableItems(menus),
  );

  useEffect(() => {
    setMenuTableItems(convertToMenuTableItems(menus));
  }, [menus]);

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
  const handleEdit = useCallback((menuId: number) => {
    setSelectedMenuId(menuId);
    setIsModalOpen(true);
  }, []);
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedMenuId(null);
  }, []);
  const handleSave = useCallback((data: Partial<IMenuDetailResponse>) => {
    setIsModalOpen(false);
  }, []);

  const firstFilteredItems = useMemo(() => {
    switch (menuFilter) {
      case 2: // 판매중
        return menuTableItems.filter((item) => item.status === 'SALE');
      case 3: // 품절
        return menuTableItems.filter((item) => item.status === 'SOLDOUT');
      case 4: // 숨김
        return menuTableItems.filter((item) => item.status === 'HIDDEN');
      case 5: // 미입력
        return menuTableItems.filter((item) => !item.status);
      default: // 전체
        return menuTableItems;
    }
  }, [menuTableItems, menuFilter]);

  const secondFilteredItems = useMemo(() => {
    if (selectedCategory === 0) {
      return firstFilteredItems;
    }

    const categoryName = categories.find(
      (c) => c.id === selectedCategory,
    )?.category;
    if (!categoryName) {
      return firstFilteredItems;
    }

    return firstFilteredItems.filter((item) => item.category === categoryName);
  }, [firstFilteredItems, selectedCategory, categories]);

  const finalFilteredItems = useMemo(() => {
    if (!searchValue.trim()) return secondFilteredItems;
    const lower = searchValue.toLowerCase();
    return secondFilteredItems.filter((item) =>
      item.name.toLowerCase().includes(lower),
    );
  }, [secondFilteredItems, searchValue]);

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
                  color={selectedCategory === 0 ? 'black' : 'white'}
                  size="small"
                  width="fit"
                  onClick={() => setSelectedCategory(0)}
                  radius="full"
                  right={
                    <div className="text-mb-5 text-gray-200">
                      {totalMenuCount}
                    </div>
                  }
                />
                {categories.map((cat) => {
                  const menuCategory = menus.find((m) => m.id === cat.id);
                  const count = menuCategory ? menuCategory.items.length : 0;

                  return (
                    <CategoryButton
                      key={cat.id}
                      text={cat.category}
                      color={selectedCategory === cat.id ? 'black' : 'white'}
                      size="small"
                      radius="full"
                      width="fit"
                      right={
                        <span className="text-gray-500 text-xs">{count}</span>
                      }
                      onClick={() => setSelectedCategory(cat.id)}
                    />
                  );
                })}
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
              <div className="text-gray-600">{totalMenuCount}</div>
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
              color={menuFilter === option.id ? 'black' : 'white'}
              size="small"
              width="fit"
              radius="full"
              onClick={() => setMenuFilter(option.id)}
            />
          ))}
        </div>
      </div>

      <div className="wrapper w-full p-4">
        {viewType === 'table' ? (
          <>
            <table className="w-full table-auto border-separate border-spacing-0 overflow-hidden rounded-xl">
              <MenuTableHeader />
              <tbody className="text-mb-4 rounded-t-none rounded-bl-xl rounded-br-xl border border-t-0 text-gray-600">
                {isMenusLoading
                  ? Array.from({ length: 10 }).map((_, idx) => (
                      <MenuTableRowSkeleton key={idx} idx={idx} />
                    ))
                  : finalFilteredItems.map((item, idx) => (
                      <MenuTableRow
                        key={item.id}
                        item={item}
                        categories={categories}
                        onEdit={handleEdit}
                        onCheck={handleCheckbox}
                        isLastRow={idx === menus.length}
                      />
                    ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4">
              {isLoading
                ? menus.map((_, idx) => <MenuGalleryCardSkeleton key={idx} />)
                : menus.map((item) => (
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

      {selectedMenuId !== null && (
        <EditMenuModal
          menuId={selectedMenuId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}

      {currentModal !== null && (
        <EditModal>
          {currentModal === 'createMenu' && (
            <>
              <EditModalHeader onSave={() => {}} buttonLabel="추가하기">
                메뉴 추가하기
              </EditModalHeader>
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
