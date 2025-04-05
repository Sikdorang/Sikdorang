'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import TopNav from '@/components/layout/headers/TopNav';
import MainControlButton from '@/components/pages/menu/MainControlButton';
import ManageButton from '@/components/pages/menu/ManageButton';
import MenuManageSelect from '@/components/pages/menu/MenuManageSelect';
import CheckboxInput from '@/components/common/inputs/CheckboxInput';
import CategorySidebar from '@/components/layout/sidebars/CategorySidebar';
import MenuTextInput from '@/components/pages/menu/MenuTextInput';

interface IMenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  status: string;
}

export default function MenuPage() {
  const [showOnlyEmptyMenus, setShowOnlyEmptyMenus] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const [categories, setCategories] = useState(['안주', '증류주', '열두글자열두글자열두글자', '음료']);
  const [status] = useState(['판매 중', '판매 중단', '판매 예정']);
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([
    {
      id: 1,
      name: '이십글자임이십글자임이십글자임이십글자임',
      description: '맛있는 스테이크',
      price: '999,999,999',
      category: '열두글자열두글자열두글자',
      status: '판매 중',
    },
    {
      id: 2,
      name: '파스타',
      description: '크림 파스타',
      price: '15,800',
      category: '음료',
      status: '판매 중',
    },
  ]);

  const addMenuItem = () => {
    setMenuItems((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: '',
        description: '',
        price: '',
        category: '',
        status: '판매 예정',
      },
    ]);
  };

  const deleteMenuItem = (id: number) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateMenuItem = (id: number, field: keyof IMenuItem, value: string | boolean) => {
    setMenuItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const handleCategoryChange = (id: number, value: string) => {
    updateMenuItem(id, 'category', value);
  };

  const handleStatusChange = (id: number, value: string) => {
    updateMenuItem(id, 'status', value);
  };

  const filteredMenuItems = showOnlyEmptyMenus
    ? menuItems.filter((item) => !item.name || !item.price || !item.category)
    : menuItems;

  return (
    <>
      <TopNav />

      <div className="pt-30  mx-auto p-6 wrapper">
        <header className="mb-6">
          <h1 className="text-title-xl">메뉴 관리</h1>
        </header>

        <header className="flex flex-row w-full mb-6">
          <MainControlButton
            className="flex-none w-fit"
            onClick={() =>
              window.open('https://www.notion.so/1c8e4c6f133f8008881ffda5240479ea', '_blank', 'noopener noreferrer')
            }
          >
            사용 설명 보기
          </MainControlButton>
          <div className="grow"></div>
          <CheckboxInput
            text="미입력 메뉴만 보기"
            checked={showOnlyEmptyMenus}
            onChange={(checked) => setShowOnlyEmptyMenus(checked)}
          ></CheckboxInput>
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

                {/* 메뉴명 */}
                <td className="items-center">
                  <MenuTextInput
                    variant="menu"
                    defaultValue={item.name}
                    placeholder="메뉴명"
                    onSave={(value) => updateMenuItem(item.id, 'name', value)}
                    className={`w-full p-1 m-5 rounded text-left`}
                    maxLength={20}
                  />
                </td>

                {/* 가격 */}
                <td className="text-center">
                  <MenuTextInput
                    variant="menu"
                    defaultValue={item.price}
                    placeholder="가격"
                    onSave={(value) => updateMenuItem(item.id, 'price', value)}
                    maxLength={11}
                  />
                </td>

                {/* 카테고리 */}
                <td className="text-center">
                  <MenuManageSelect
                    options={categories}
                    selectedOption={item.category}
                    onChange={(value) => handleCategoryChange(item.id, value)}
                  />
                </td>

                {/* 상태 */}
                <td className="text-center">
                  <MenuManageSelect
                    options={status}
                    selectedOption={item.status}
                    isStatus={true}
                    onChange={(value) => handleStatusChange(item.id, value)}
                  />
                </td>

                {/* 이미지 및 설명 */}
                <td className="text-center">
                  <Link href={`/menu/${item.id}`}>
                    <ManageButton variant="modify">편집하기</ManageButton>
                  </Link>
                </td>

                {/* 삭제 */}
                <td className="text-center space-x-1">
                  <ManageButton variant="delete" onClick={() => deleteMenuItem(item.id)}>
                    삭제
                  </ManageButton>
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
          categories={categories}
          setCategories={setCategories}
        />
      </div>
    </>
  );
}
