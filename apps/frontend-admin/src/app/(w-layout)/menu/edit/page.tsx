'use client';

import {
  default as CategoryButton,
  default as FilterOptionButton,
  default as TableControlButton,
} from '@/components/common/buttons/CtaButton';
import SearchInput from '@/components/common/inputs/TextInput';
import CreateMenuModal from '@/components/common/modals/CreateMenuModal';
import EditMenuModal from '@/components/common/modals/EditMenuModal';
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
import { menuFilterOptions } from '@/constants/filter';
import { ERROR_MESSAGES } from '@/constants/messages';
import { useManageCategory } from '@/hooks/useManageCategory';
import { useManageMenu } from '@/hooks/useManageMenu';
import {
  IMenuCardItem,
  IMenuDetailItem,
  IMenuTableItem,
} from '@/types/model/menu';
import {
  convertToMenuCardItems,
  convertToMenuTableItems,
} from '@/utilities/reshape';
import GalleryIcon from '@public/icons/ic_grid.svg';
import TableIcon from '@public/icons/ic_list.svg';
import AddIcon from '@public/icons/ic_plus.svg';
import { LexoRank } from 'lexorank';
import { isEqual } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function MenuEditPage() {
  const { categories, isCategoriesLoading, createCategory, fetchCategories } =
    useManageCategory();
  const { menus, isMenusLoading, fetchMenus, updateMenus, removeMenu } =
    useManageMenu();

  const [temporaryCardMenus, setTemporaryCardMenus] = useState<IMenuCardItem[]>(
    [],
  );
  const [temporaryMenus, setTemporaryMenus] = useState<IMenuTableItem[]>([]);
  useEffect(() => {
    fetchMenus();
    fetchCategories();
  }, []);
  useEffect(() => {
    setTemporaryMenus(convertToMenuTableItems(menus));
    setTemporaryCardMenus(convertToMenuCardItems(menus));
  }, [menus]);

  useEffect(() => {
    fetchCategories();
    fetchMenus();
  }, []);

  const menuTableItemsDictItem = useMemo(
    () => convertToMenuTableItems(menus),
    [menus],
  );

  const originalDict = useMemo(
    () =>
      Object.fromEntries(menuTableItemsDictItem.map((m) => [m.id, m] as const)),
    [menuTableItemsDictItem],
  );
  const tempDict = useMemo(
    () => Object.fromEntries(temporaryMenus.map((m) => [m.id, m] as const)),
    [temporaryMenus],
  );
  const [changedIds, setChangedIds] = useState<Set<number>>(new Set());
  useEffect(() => {
    const ids = new Set<number>();
    for (const id of Object.keys(tempDict).map(Number)) {
      const orig = originalDict[id];
      if (!orig || !isEqual(orig, tempDict[id])) ids.add(id);
    }
    for (const id of Object.keys(originalDict).map(Number)) {
      if (!tempDict[id]) ids.add(id);
    }
    setChangedIds(ids);
  }, [originalDict, tempDict]);
  const handleUpdate = (
    id: number,
    field: keyof IMenuTableItem,
    value: any,
  ) => {
    setTemporaryMenus((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    );
  };
  const handleDelete = useCallback((id: number) => {
    setTemporaryMenus((prev) => prev.filter((m) => m.id !== id));
  }, []);
  const handleSync = async () => {
    if (changedIds.size === 0) return;

    const requests: Array<{
      menuId: number;
      menu?: string;
      price?: number;
      categoryId?: number;
      status?: string;
      order?: string;
    }> = [];

    for (const id of Array.from(changedIds)) {
      const orig = originalDict[id];
      const curr = tempDict[id];
      if (!curr) continue;

      const payload: {
        menuId: number;
        status?: string;
        menu?: string;
        price?: number;
        categoryId?: number;
        order?: string;
      } = {
        menuId: id,
      };

      if (orig && curr.name !== orig.name) payload.menu = curr.name;
      if (orig && curr.price !== orig.price) payload.price = curr.price!;
      if (orig && curr.categoryId !== orig.categoryId) {
        payload.categoryId = curr.categoryId ?? 0;
      }
      if (orig && curr.status !== orig.status) {
        payload.status = curr.status;
      }
      // if (orig && curr.order !== orig.order) payload.order = curr.order;

      requests.push(payload);
    }

    try {
      await updateMenus(requests);
      await fetchMenus();
    } catch (e) {
      console.error('Sync error:', e);
    }
  };

  const [categoryError, setCategoryError] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [menuFilter, setMenuFilter] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const [viewType, setViewType] = useState<'table' | 'gallery'>('table');

  const [showCreateMenuModal, setShowCreateMenuModal] = useState(false);

  const totalMenuCount =
    menus?.reduce((acc, category) => acc + (category?.items?.length || 0), 0) ||
    0;

  const [selectedMenuIds, setSelectedMenuIds] = useState<number[]>([]);
  const handleCheckbox = (menuId: number) => {
    setSelectedMenuIds((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId],
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

  const [menuTableItems, setMenuTableItems] = useState<IMenuTableItem[]>(() =>
    convertToMenuTableItems(menus),
  );
  const [cardItems, setCardItems] = useState<IMenuCardItem[]>(() =>
    convertToMenuCardItems(menus),
  );

  useEffect(() => {
    setMenuTableItems(temporaryMenus);
  }, [temporaryMenus]);

  useEffect(() => {
    setCardItems(temporaryCardMenus);
  }, [temporaryCardMenus]);

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
  const handleSave = useCallback((data: Partial<IMenuDetailItem>) => {
    setIsModalOpen(false);
  }, []);

  const firstFilteredItems = useMemo(() => {
    switch (menuFilter) {
      case 2:
        return menuTableItems.filter((item) => item.status === 'SALE');
      case 3:
        return menuTableItems.filter((item) => item.status === 'SOLDOUT');
      case 4:
        return menuTableItems.filter((item) => item.status === 'HIDDEN');
      case 5:
        return menuTableItems.filter((item) => !item.status);
      default:
        return menuTableItems;
    }
  }, [menuTableItems, menuFilter]);

  const secondFilteredItems = useMemo(() => {
    if (selectedCategory === 0) {
      return firstFilteredItems;
    }

    return firstFilteredItems.filter(
      (item) => item.categoryId === selectedCategory,
    );
  }, [firstFilteredItems, selectedCategory]);

  const finalFilteredItems = useMemo(() => {
    if (!searchValue.trim()) return secondFilteredItems;
    const lower = searchValue.toLowerCase();
    return secondFilteredItems.filter((item) =>
      item.name.toLowerCase().includes(lower),
    );
  }, [secondFilteredItems, searchValue]);

  const firstCardItems = useMemo(() => {
    switch (menuFilter) {
      case 2:
        return cardItems.filter((item) => item.status === 'SALE');
      case 3:
        return cardItems.filter((item) => item.status === 'SOLDOUT');
      case 4:
        return cardItems.filter((item) => item.status === 'HIDDEN');
      case 5:
        return cardItems.filter((item) => !item.status);
      default:
        return cardItems;
    }
  }, [cardItems, menuFilter]);

  const secondCardItems = useMemo(() => {
    if (selectedCategory === 0) return firstCardItems;
    return firstCardItems.filter(
      (item) => item.categoryId === selectedCategory,
    );
  }, [firstCardItems, selectedCategory]);

  const finalCardItems = useMemo(() => {
    if (!searchValue.trim()) return secondCardItems;
    const lower = searchValue.toLowerCase();
    return secondCardItems.filter((item) =>
      item.name.toLowerCase().includes(lower),
    );
  }, [secondCardItems, searchValue]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="wrapper flex w-full flex-col items-center justify-center py-4">
        <div className="w-full mb-2">
          <SearchInput
            label="메뉴 편집"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClear={() => setSearchValue('')}
            placeholder="찾으시는 메뉴가 있으신가요?"
            maxLength={50}
            disabled={false}
          />
        </div>

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
                  const menuCategory = menus?.find((m) => m.id === cat.id);
                  const count = menuCategory?.items?.length ?? 0;

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
                  <AddIcon width={16} height={16} />
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
              <TableIcon />
            </button>
            <button
              className={`rounded-md px-2 py-2 ${
                viewType === 'gallery' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
              onClick={() => setViewType('gallery')}
            >
              <GalleryIcon />
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
                onClick={() => {
                  setShowCreateMenuModal(true);
                }}
              />
              <TableControlButton
                text="삭제하기"
                color={selectedMenuIds.length > 0 ? 'red' : 'gray'}
                size="small"
                radius="xl"
                disabled={selectedMenuIds.length === 0}
                width="fit"
                onClick={async () => {
                  for (const id of selectedMenuIds) {
                    await removeMenu(id);
                  }
                  await fetchMenus();
                  setSelectedMenuIds([]);
                }}
              />
              <TableControlButton
                text="변경사항 저장하기"
                size="small"
                radius="xl"
                width="fit"
                color={changedIds.size > 0 ? 'yellow' : 'gray'}
                disabled={changedIds.size === 0}
                onClick={handleSync}
              />
            </>
          ) : (
            <TableControlButton
              text="메뉴 추가하기"
              color="yellow"
              size="small"
              width="fit"
              radius="xl"
              onClick={() => {
                setShowCreateMenuModal(true);
              }}
            />
          )}
        </div>
        <div className="flex gap-4 pt-2">
          {menuFilterOptions.map((option) => (
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
                        onUpdate={handleUpdate}
                        checked={selectedMenuIds.includes(item.id)}
                      />
                    ))}
              </tbody>
            </table>
            <div className="h-20" />
          </>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4">
              {isMenusLoading
                ? Array.from({ length: 9 }).map((_, idx) => (
                    <MenuGalleryCardSkeleton key={idx} />
                  ))
                : finalCardItems.map((menu) => (
                    <MenuGalleryCard
                      key={menu.id}
                      onDelete={handleDelete}
                      item={{
                        id: menu.id,
                        name: menu.name,
                        price: menu.price,
                        isNew: menu.isNew,
                        isPopular: menu.isPopular,
                        imgUrl: menu.imgUrl,
                      }}
                    />
                  ))}
            </div>
            <div className="h-20" />
          </>
        )}
      </div>

      {selectedMenuId !== null && (
        <EditMenuModal
          menuId={selectedMenuId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      <CreateMenuModal
        isOpen={showCreateMenuModal}
        onClose={() => {
          setShowCreateMenuModal(false);
          fetchMenus();
        }}
      />

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
