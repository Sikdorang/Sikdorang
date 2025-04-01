'use client';

import React, { useState } from 'react';
import TopNav from '@/components/layout/headers/TopNav';
import Modal from '@/components/features/modal/ImageManageModal';
import MainControlButton from '@/components/pages/menu/MainControlButton';
import ManageButton from '@/components/pages/menu/ManageButton';
import MenuManageSelect from '@/components/pages/menu/MenuManageSelect';
import CheckboxInput from '@/components/common/inputs/CheckboxInput';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  status: string;
  isEditing: boolean; // 수정 상태 추가
}

export default function MenuPage() {
  const [showOnlyEmptyMenus, setShowOnlyEmptyMenus] = useState(false);

  const [categories, setCategories] = useState(['안주', '증류주', '저는여덟글자에요하하하하', '음료']);
  const [status, setStatus] = useState(['판매 중', '판매 중단', '판매 예정']);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: '안녕하세요저는다섯개안녕하세요저는다섯개안녕하세요저는다섯개',
      description: '맛있는 스테이크',
      price: '999,999,999',
      category: '저는여덟글자에요하하하하',
      status: '판매 중',
      isEditing: false,
    },
    {
      id: 2,
      name: '파스타',
      description: '크림 파스타',
      price: '15,800',
      category: '음료',
      status: '판매 중',
      isEditing: false,
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
        isEditing: true, // 새로 추가된 항목은 바로 수정 가능 상태로 설정
      },
    ]);
  };

  const deleteMenuItem = (id: number) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateMenuItem = (id: number, field: keyof MenuItem, value: string | boolean) => {
    setMenuItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const handleCategoryChange = (id: number, value: string) => {
    updateMenuItem(id, 'category', value);
  };

  const handleStatusChange = (id: number, value: string) => {
    updateMenuItem(id, 'status', value);
  };

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <TopNav />

      <div className="pt-30  mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-title-xl">메뉴 관리</h1>
        </header>

        <header className="flex flex-row w-full mb-6">
          <MainControlButton text="사용 설명 보기" className="flex-none w-fit" />
          <div className="grow"></div>
          <CheckboxInput
            text="미입력 메뉴만 보기"
            checked={showOnlyEmptyMenus}
            onChange={(checked) => setShowOnlyEmptyMenus(checked)}
          />
          <MainControlButton text="카테고리 편집" variant="category" className="flex-none w-fit" />
        </header>

        <table className="w-full table-auto border-none">
          <thead className="bg-gray-100 text-gray-800 text-label-sm-sb border-b border-b-gray-400">
            <tr>
              <th className="px-5 py-5 w-[5%]">번호</th>
              <th className="px-5 py-5 w-[40%] text-left">메뉴명</th>
              <th className="px-5 py-5 w-[10%]">가격</th>
              <th className="px-5 py-5 w-[15%]">카테고리</th>
              <th className="px-5 py-5 w-[10%]">상태</th>
              <th className="px-5 py-5 w-[10%]">이미지 및 설명</th>
              <th className="px-5 py-5 w-[10%]">삭제</th>
            </tr>
          </thead>

          <tbody className="text-label-sm-m text-gray-700">
            {menuItems.map((item, idx) => (
              <tr key={item.id}>
                <td className="text-center">{idx + 1}</td>

                {/* 메뉴명 */}
                <td className="text-center items-center">
                  <input
                    type="text"
                    value={item.name}
                    placeholder="메뉴명"
                    onChange={(e) => updateMenuItem(item.id, 'name', e.target.value)}
                    maxLength={20}
                    className={`w-full p-1 m-5 rounded text-left`}
                  />
                </td>

                {/* 가격 */}
                <td className="text-center">
                  <input
                    type="text"
                    value={item.price}
                    placeholder="가격"
                    onChange={(e) => updateMenuItem(item.id, 'price', e.target.value)}
                    maxLength={11}
                    className={`w-full p-1 rounded text-center`}
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
                  <ManageButton text="편집하기" variant="modify" onClick={() => openModal(item)} />
                </td>

                {/* 삭제 */}
                <td className="text-center space-x-1">
                  <ManageButton text="삭제" variant="delete" onClick={() => deleteMenuItem(item.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <MainControlButton text="새로운 메뉴 추가" className="w-full py-5" onClick={addMenuItem} />

        <Modal isOpen={isModalOpen} onClose={closeModal} item={selectedItem} />
      </div>
    </>
  );
}
