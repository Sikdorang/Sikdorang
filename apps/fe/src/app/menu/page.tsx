'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { isEqual } from 'lodash';
import { useManageMenu } from '@/hooks/useManageMenu';
import { useManageCategory } from '@/hooks/useManageCategory';
import { useDeleteMenuStore } from '@/stores/useDeleteMenuStore';
import { SYNC_ACTIONS } from '@/constants/enums';
import { LexoRank } from 'lexorank';
import { IManageMenuItem, ISyncMenuRequest } from '@/types/model/menu';
import { ICategoryItem } from '@/types/model/category';

import TopNav from '@/components/layout/headers/TopNav';
import MenuHeader from '@/components/pages/menu/MenuHeader';
import Spinner from '@/components/common/loadings/Spinner';
import MenuTableElement from '@/components/pages/menu/MenuTableElement';
import MainControlButton from '@/components/pages/menu/cells/MainControlButton';
import CategorySidebar from '@/components/layout/sidebars/CategorySidebar';
import DeleteMenuModal from '@/components/pages/menu/MenuDeleteModal';
import { useQueryClient } from '@tanstack/react-query';
import { invalidateQueries } from '@/utilities/invalidateQuery';

export default function MenuPage() {
  const queryClient = useQueryClient();
  const { menus, isLoading, fetchMenus, deleteMenu, syncMenus } = useManageMenu();
  const { categories, fetchCategories } = useManageCategory();
  const { setDeleteHandler, clearDeleteHandler } = useDeleteMenuStore();

  useEffect(() => {
    fetchMenus();
    fetchCategories();
  }, []);
  useEffect(() => {
    setTemporaryMenus(menus);
  }, [menus]);
  useEffect(() => {
    setTemporaryCategories(categories);
  }, [categories]);
  useEffect(() => {
    setIsMenusLoading(isLoading);
  }, [isLoading]);

  const [isMenusLoading, setIsMenusLoading] = useState<boolean>(true);
  const [temporaryMenus, setTemporaryMenus] = useState<IManageMenuItem[]>([]);
  const [changeLogIds, setChangeLogIds] = useState<Set<number>>(new Set());
  const [menuErrors, setMenuErrors] = useState<Record<number, string>>({});
  const originalMenuDict = useMemo(
    () => menus.reduce((acc, menu) => ({ ...acc, [menu.id]: menu }), {} as Record<number, IManageMenuItem>),
    [menus],
  );
  const tempMenuDict = useMemo(
    () => temporaryMenus.reduce((acc, menu) => ({ ...acc, [menu.id]: menu }), {} as Record<number, IManageMenuItem>),
    [temporaryMenus],
  );
  useEffect(() => {
    const changedIds = Object.keys(tempMenuDict)
      .filter((id) => {
        const menuId = Number(id);
        const original = originalMenuDict[menuId];
        const current = tempMenuDict[menuId];

        return !original || !isEqual(original, current);
      })
      .map(Number);

    const deletedIds = Object.keys(originalMenuDict)
      .filter((id) => !tempMenuDict.hasOwnProperty(id))
      .map(Number);

    setChangeLogIds(new Set([...changedIds, ...deletedIds]));
  }, [originalMenuDict, tempMenuDict]);
  useEffect(() => {
    setDeleteHandler(deleteMenuItem);
    return () => clearDeleteHandler();
  }, [setDeleteHandler, clearDeleteHandler]);
  const handleSynchronize = async () => {
    const changedIds = Array.from(changeLogIds);
    const syncDatas = changedIds
      .map((id) => {
        const original = menus.find((m) => m.id === id);
        const current = temporaryMenus.find((m) => m.id === id);

        if (id < 0 || !original) {
          return {
            action: 'create',
            id: -1,
            data: {
              menu: current?.menu ?? '',
              price: current?.price ?? 0,
              categoryId: temporaryCategories.find((c) => c.category === current?.category)?.id ?? 0,
              status: current?.status ?? '',
              order: current?.order ?? '',
            },
          } as ISyncMenuRequest;
        }
        if (!current) {
          return null;
        }
        return {
          action: 'update',
          id,
          data: {
            menu: current.menu,
            price: current.price ?? 0,
            categoryId: temporaryCategories.find((c) => c.category === current.category)?.id ?? 0,
            status: current.status ?? '',
            order: current.order ?? '',
          },
        } as ISyncMenuRequest;
      })
      .filter((d): d is ISyncMenuRequest => d !== null);
    try {
      console.log('Debug 1');
      await syncMenus(syncDatas);
      setChangeLogIds(new Set());
      setMenuErrors({});
      invalidateQueries(queryClient);
      fetchMenus();
    } catch (error) {
      console.error('Sync error:', error);
    }
  };
  const addMenuItem = () => {
    const sortedMenus = [...temporaryMenus].sort((a, b) => a.order.localeCompare(b.order));
    const lastOrder =
      sortedMenus.length > 0 ? LexoRank.parse(sortedMenus[sortedMenus.length - 1].order) : LexoRank.min();
    const newOrder = lastOrder.genNext();
    setTemporaryMenus((prev) => [
      ...prev,
      {
        id: -Date.now(),
        menu: '',
        price: null,
        category: '',
        status: '판매 중',
        order: newOrder.toString(),
      },
    ]);
  };
  const deleteMenuItem = useCallback(
    (id: number) => setTemporaryMenus((prev) => prev.filter((item) => item.id !== id)),
    [setTemporaryMenus],
  );
  const updateMenuItem = (id: number, field: keyof IManageMenuItem, value: string | boolean | number) =>
    setTemporaryMenus((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [temporaryCategories, setTemporaryCategories] = useState<ICategoryItem[]>([]);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => setShowOnlyEmptyMenus(e.target.checked);
  const handleCategoryChange = (id: number, value: string) => updateMenuItem(id, 'category', value);

  const [status] = useState(['판매 중', '판매 중단', '판매 예정']);
  const handleStatusChange = (id: number, value: string) => {
    updateMenuItem(id, 'status', value);
  };

  const [showOnlyEmptyMenus, setShowOnlyEmptyMenus] = useState(false);
  const filteredMenuItems = showOnlyEmptyMenus
    ? temporaryMenus.filter((item) => !item.menu || item.price === undefined || item.price === null || !item.category)
    : temporaryMenus;

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingMenu, setDeletingMenu] = useState<{ id: number; name: string } | null>(null);

  return (
    <>
      <TopNav />

      <div className="pt-30 mx-auto p-6 wrapper">
        <MenuHeader
          showOnlyEmptyMenus={showOnlyEmptyMenus}
          handleCheckboxChange={handleCheckboxChange}
          handleSynchronize={handleSynchronize}
          changeLogIds={changeLogIds}
          toggleSidebar={toggleSidebar}
        />

        {isMenusLoading ? (
          <div className="flex h-100 justify-center items-center">
            <Spinner className="border-blue-500 w-10 h-10" />
          </div>
        ) : (
          <>
            <table className="w-full table-auto border-none">
              <thead className="bg-gray-100 text-gray-800 text-label-sm-sb border-b border-b-gray-400">
                <tr>
                  <th className="px-5 py-5 w-[10%] whitespace-nowrap">번호</th>
                  <th className="px-5 py-5 w-[35%] text-left whitespace-nowrap">메뉴명</th>
                  <th className="px-5 py-5 w-[10%] whitespace-nowrap">가격</th>
                  <th className="px-5 py-5 w-[15%] whitespace-nowrap">카테고리</th>
                  <th className="px-5 py-5 w-[10%] whitespace-nowrap">상태</th>
                  <th className="px-5 py-5 w-[10%] whitespace-nowrap">이미지 및 설명</th>
                  <th className="px-5 py-5 w-[10%] whitespace-nowrap">삭제</th>
                </tr>
              </thead>
              <tbody className="text-label-sm-m text-gray-700">
                {filteredMenuItems.map((item, idx) => (
                  <MenuTableElement
                    key={item.id}
                    item={item}
                    idx={idx}
                    categories={temporaryCategories}
                    status={status}
                    updateMenuItem={updateMenuItem}
                    handleCategoryChange={handleCategoryChange}
                    handleStatusChange={handleStatusChange}
                    setMenuErrors={setMenuErrors}
                    menuErrors={menuErrors}
                    onDeleteClick={() => {
                      setDeletingMenu({ id: item.id, name: item.menu });
                      setDeleteModalOpen(true);
                    }}
                  />
                ))}
              </tbody>
            </table>
            <MainControlButton className="w-full py-5" onClick={addMenuItem}>
              새로운 메뉴 추가
            </MainControlButton>
          </>
        )}

        <CategorySidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          setTemporaryMenus={setTemporaryMenus}
          setTemporaryCategories={setTemporaryCategories}
          temporaryCategories={temporaryCategories}
        />

        {deleteModalOpen && deletingMenu && (
          <DeleteMenuModal
            id={deletingMenu.id}
            name={deletingMenu.name}
            onDelete={() => {
              deleteMenu(deletingMenu.id);
              setDeletingMenu(null);
              setDeleteModalOpen(false);
            }}
            onCancel={() => {
              setDeleteModalOpen(false);
            }}
          />
        )}
      </div>
    </>
  );
}
