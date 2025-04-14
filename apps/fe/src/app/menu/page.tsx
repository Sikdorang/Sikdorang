'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { isEqual } from 'lodash';
import { useManageMenu, IMenu } from '@/hooks/useManageMenu';
import { useManageCategory, ICategory } from '@/hooks/useManageCategory';
import { useDeleteMenuStore } from '@/stores/useDeleteMenuStore';
import { SYNC_ACTIONS } from '@/constants/enums';

import TopNav from '@/components/layout/headers/TopNav';
import MenuHeader from '@/components/pages/menu/MenuHeader';
import Spinner from '@/components/common/loadings/Spinner';
import MenuTableElement from '@/components/pages/menu/MenuTableElement';
import MainControlButton from '@/components/pages/menu/MainControlButton';
import CategorySidebar from '@/components/layout/sidebars/CategorySidebar';

export default function MenuPage() {
  const { menus, isLoading, error, fetchMenus, syncMenus } = useManageMenu();
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
  const [temporaryMenus, setTemporaryMenus] = useState<IMenu[]>([]);
  const [changeLogIds, setChangeLogIds] = useState<Set<number>>(new Set());
  const [menuErrors, setMenuErrors] = useState<Record<number, string>>({});
  const originalMenuDict = useMemo(
    () => menus.reduce((acc, menu) => ({ ...acc, [menu.id]: menu }), {} as Record<number, IMenu>),
    [menus],
  );
  const tempMenuDict = useMemo(
    () => temporaryMenus.reduce((acc, menu) => ({ ...acc, [menu.id]: menu }), {} as Record<number, IMenu>),
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

    const syncData = changedIds.map((id) => {
      const original = menus.find((m) => m.id === id);
      const current = temporaryMenus.find((m) => m.id === id);

      if (id < 0 || !original) {
        return {
          action: SYNC_ACTIONS.CREATE,
          id: -1,
          data: {
            menu: current?.menu || '',
            price: current?.price || 0,
            categoryId: categories.find((c) => c.category === current?.category)?.id || 0,
            status: current?.status,
          },
        };
      }
      if (!current) {
        return {
          action: SYNC_ACTIONS.DELETE,
          id,
          data: {},
        };
      }
      return {
        action: SYNC_ACTIONS.UPDATE,
        id,
        data: {
          menu: current.menu,
          price: current.price,
          categoryId: categories.find((c) => c.category === current.category)?.id || 0,
          status: current.status,
        },
      };
    });

    try {
      await syncMenus(syncData);

      setChangeLogIds(new Set());
      setMenuErrors({});
      fetchMenus();
    } catch (error) {
      console.error('Sync error:', error);
    }
  };
  const addMenuItem = () => {
    setTemporaryMenus((prev) => [
      ...prev,
      {
        id: -Date.now(),
        menu: '',
        price: 0,
        category: '',
        status: '판매 예정',
      },
    ]);
  };
  const deleteMenuItem = (id: number) => setTemporaryMenus((prev) => prev.filter((item) => item.id !== id));
  const updateMenuItem = (id: number, field: keyof IMenu, value: string | boolean | number) =>
    setTemporaryMenus((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [temporaryCategories, setTemporaryCategories] = useState<ICategory[]>([]);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => setShowOnlyEmptyMenus(e.target.checked);
  const handleCategoryChange = (id: number, value: string) => updateMenuItem(id, 'category', value);

  const [status] = useState(['판매 중', '판매 중단', '판매 예정']);
  const handleStatusChange = (id: number, value: string) => {
    updateMenuItem(id, 'status', value);
    console.log('value: ', value);
  };

  const [showOnlyEmptyMenus, setShowOnlyEmptyMenus] = useState(false);
  const filteredMenuItems = showOnlyEmptyMenus
    ? temporaryMenus.filter((item) => !item.menu || !item.price || !item.category)
    : temporaryMenus;

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
                  <th className="px-5 py-5 w-[10%]">번호</th>
                  <th className="px-5 py-5 w-[35%] text-left">메뉴명</th>
                  <th className="px-5 py-5 w-[10%]">가격</th>
                  <th className="px-5 py-5 w-[15%]">카테고리</th>
                  <th className="px-5 py-5 w-[10%]">상태</th>
                  <th className="px-5 py-5 w-[10%]">이미지 및 설명</th>
                  <th className="px-5 py-5 w-[10%]">삭제</th>
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
        />
      </div>
    </>
  );
}
