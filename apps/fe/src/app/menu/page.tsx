'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { isEqual } from 'lodash';
import { useManageMenu, IMenu } from '@/hooks/useManageMenu';
import { useManageCategory } from '@/hooks/useManageCategory';
import { useDeleteMenuStore } from '@/stores/useDeleteMenuStore';

import TopNav from '@/components/layout/headers/TopNav';
import MainControlButton from '@/components/pages/menu/MainControlButton';
import ManageButton from '@/components/pages/menu/ManageButton';
import MenuManageSelect from '@/components/pages/menu/MenuManageSelect';
import CheckboxInput from '@/components/common/inputs/CheckboxInput';
import CategorySidebar from '@/components/layout/sidebars/CategorySidebar';
import MenuTextInput from '@/components/pages/menu/MenuTextInput';

import { URLS } from '@/constants/urls';

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
    fetchCategories();
  }, [categories]);

  const [temporaryMenus, setTemporaryMenus] = useState<IMenu[]>([]);
  const [changeLogIds, setChangeLogIds] = useState<Set<number>>(new Set());
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
    console.log(changedIds, deletedIds);
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
          action: 'create' as const,
          id: -1,
          data: {
            menu: current?.menu || '',
            price: current?.price || 0,
            categoryId: categories.find((c) => c.category === current?.category)?.id || 0,
            soldOut: current?.status === '판매 예정',
          },
        };
      }
      if (!current) {
        return {
          action: 'delete' as const,
          id,
          data: {},
        };
      }
      return {
        action: 'update' as const,
        id,
        data: {
          menu: current.menu,
          price: current.price,
          categoryId: categories.find((c) => c.category === current.category)?.id || 0,
          soldOut: current.status === '판매 중단',
        },
      };
    });

    try {
      await syncMenus(syncData);

      setChangeLogIds(new Set());

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
  const updateMenuItem = (id: number, field: keyof IMenu, value: string | boolean) =>
    setTemporaryMenus((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => setShowOnlyEmptyMenus(e.target.checked);
  const handleCategoryChange = (id: number, value: string) => updateMenuItem(id, 'category', value);

  const [status] = useState(['판매 중', '판매 중단', '판매 예정']);
  const handleStatusChange = (id: number, value: string) => updateMenuItem(id, 'status', value);

  const [showOnlyEmptyMenus, setShowOnlyEmptyMenus] = useState(false);
  const filteredMenuItems = showOnlyEmptyMenus
    ? temporaryMenus.filter((item) => !item.menu || !item.price || !item.category)
    : temporaryMenus;

  return (
    <>
      <TopNav />

      <div className="pt-30 mx-auto p-6 wrapper">
        <header className="mb-6">
          <h1 className="text-title-xl">메뉴 관리</h1>
        </header>

        <header className="flex flex-row w-full mb-6">
          <MainControlButton
            className="flex-none w-fit"
            onClick={() => window.open(URLS.helpMenuManageUrl, '_blank', 'noopener noreferrer')}
          >
            사용 설명 보기
          </MainControlButton>
          <div className="grow"></div>
          <CheckboxInput checked={showOnlyEmptyMenus} onChange={handleCheckboxChange}>
            미입력 메뉴만 보기
          </CheckboxInput>
          <MainControlButton
            className="flex-none w-fit mr-3"
            onClick={handleSynchronize}
            disabled={changeLogIds.size === 0}
          >
            변경사항 저장하기
          </MainControlButton>
          <MainControlButton variant="category" className="flex-none w-fit" onClick={toggleSidebar}>
            카테고리 편집
          </MainControlButton>
        </header>

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
              <tr key={item.id}>
                <td className="text-center">{idx + 1}</td>

                <td className="items-center">
                  <MenuTextInput
                    variant="menu"
                    defaultValue={item.menu}
                    placeholder="메뉴명"
                    onSave={(value) => updateMenuItem(item.id, 'menu', value)}
                    className={`w-full p-1 m-5 rounded text-left`}
                    maxLength={20}
                  />
                </td>

                <td className="text-center">
                  <MenuTextInput
                    variant="menu"
                    defaultValue={item.price}
                    placeholder="가격"
                    onSave={(value) => updateMenuItem(item.id, 'price', value)}
                    maxLength={11}
                  />
                </td>

                <td className="text-center">
                  <MenuManageSelect
                    options={categories.map((item) => item.category)}
                    selectedOption={item.category}
                    onChange={(value) => handleCategoryChange(item.id, value)}
                  />
                </td>

                <td className="text-center">
                  <MenuManageSelect
                    options={status}
                    selectedOption={'d'}
                    isStatus={true}
                    onChange={(value) => handleStatusChange(item.id, value)}
                  />
                </td>

                <td className="text-center">
                  <Link
                    href={{
                      pathname: `/menu/modify`,
                      query: {
                        id: item.id,
                      },
                    }}
                  >
                    <ManageButton variant="modify">편집하기</ManageButton>
                  </Link>
                </td>

                <td className="text-center">
                  <Link
                    href={{
                      pathname: '/menu/delete',
                      query: { id: item.id, name: item.menu },
                    }}
                  >
                    <ManageButton variant="delete">삭제</ManageButton>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <MainControlButton className="w-full py-5" onClick={addMenuItem}>
          새로운 메뉴 추가
        </MainControlButton>

        <CategorySidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          setTemporaryMenus={setTemporaryMenus}
        />
      </div>
    </>
  );
}
