'use client';

import React, { useState } from 'react';
import TopNav from '../../components/layout/Header/TopNav';

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
  const [categories, setCategories] = useState(['안주', '증류주', '탁주', '음료']);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: '스테이크',
      description: '맛있는 스테이크',
      price: '21,000',
      category: '안주',
      status: '판매중',
      isEditing: false,
    },
    {
      id: 2,
      name: '파스타',
      description: '크림 파스타',
      price: '15,800',
      category: '음료',
      status: '판매중',
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
        category: categories[0],
        status: '판매중',
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
    if (value === '직접입력') {
      const newCategory = prompt('새 카테고리를 입력하세요:');
      if (newCategory && newCategory.trim()) {
        setCategories((prev) => [...prev, newCategory.trim()]);
        updateMenuItem(id, 'category', newCategory.trim());
      }
    } else {
      updateMenuItem(id, 'category', value);
    }
  };

  return (
    <>
      <TopNav />

      <div className="pt-[70px] container mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">메뉴 등록</h1>
        </header>

        <div className="bg-blue-50 p-4 rounded mb-4">
          <p>메뉴 정보를 입력하고, 각 메뉴에 해당하는 카테고리를 선택해주세요.</p>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">메뉴 목록</h2>
          <button onClick={addMenuItem} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            + 메뉴 추가
          </button>
        </div>

        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-2 w-[5%]">#</th>
              <th className="border px-2 py-2 w-[10%]">이미지</th>
              <th className="border px-2 py-2 w-[15%]">메뉴명</th>
              <th className="border px-2 py-2 w-[15%]">설명</th>
              <th className="border px-2 py-2 w-[15%]">가격</th>
              <th className="border px-2 py-2 w-[15%]">카테고리</th>
              <th className="border px-2 py-2 w-[10%]">상태</th>
              <th className="border px-2 py-2 w-[10%]">관리</th>
            </tr>
          </thead>

          <tbody>
            {menuItems.map((item, idx) => (
              <tr key={item.id}>
                <td className="border text-center">{idx + 1}</td>

                {/* 이미지 업로드 버튼 */}
                <td className="border text-center">
                  <button className="text-sm bg-orange-200 hover:bg-orange-300 rounded px-2 py-1">
                    이미지 업로드 및 설명
                  </button>
                </td>

                {/* 메뉴명 입력 */}
                <td className="border text-center">
                  <input
                    type="text"
                    value={item.name}
                    placeholder="메뉴명"
                    disabled={!item.isEditing} // 수정 가능 여부에 따라 비활성화
                    onChange={(e) => updateMenuItem(item.id, 'name', e.target.value)}
                    className={`w-full p-1 rounded text-right ${item.isEditing ? 'bg-white' : 'bg-gray-100'}`}
                  />
                </td>

                {/* 설명 입력 */}
                <td className="border text-center">
                  <input
                    type="text"
                    value={item.description}
                    placeholder="메뉴 설명"
                    disabled={!item.isEditing} // 수정 가능 여부에 따라 비활성화
                    onChange={(e) => updateMenuItem(item.id, 'description', e.target.value)}
                    className={`w-full p-1 rounded text-right ${item.isEditing ? 'bg-white' : 'bg-gray-100'}`}
                  />
                </td>

                {/* 가격 입력 */}
                <td className="border text-center">
                  <input
                    type="text"
                    value={item.price}
                    placeholder="가격"
                    disabled={!item.isEditing} // 수정 가능 여부에 따라 비활성화
                    onChange={(e) => updateMenuItem(item.id, 'price', e.target.value)}
                    className={`w-full p-1 rounded text-right ${item.isEditing ? 'bg-white' : 'bg-gray-100'}`}
                  />
                </td>

                {/* 카테고리 선택 */}
                <td className="border text-center">
                  <select
                    value={item.category}
                    disabled={!item.isEditing} // 수정 가능 여부에 따라 비활성화
                    onChange={(e) => handleCategoryChange(item.id, e.target.value)}
                    className={`w-full p-1 rounded text-right ${item.isEditing ? '' : 'bg-gray-100'}`}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="직접입력">직접입력</option>
                  </select>
                </td>

                {/* 상태 선택 */}
                <td className="border text-center">
                  <select
                    value={item.status}
                    disabled={!item.isEditing} // 수정 가능 여부에 따라 비활성화
                    onChange={(e) => updateMenuItem(item.id, 'status', e.target.value)}
                    className={`w-full p-1 rounded text-right ${item.isEditing ? '' : 'bg-gray-100'}`}
                  >
                    {['판매중', '품절', '숨김'].map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>

                {/* 관리 버튼 */}
                <td className="border text-center space-x-1">
                  {/* 수정/완료 버튼 */}
                  <button
                    onClick={() => updateMenuItem(item.id, 'isEditing', !item.isEditing)}
                    className={`${
                      item.isEditing ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white px-2 py-1 rounded text-sm`}
                  >
                    {item.isEditing ? '완료' : '수정'}
                  </button>

                  {/* 삭제 버튼 */}
                  <button
                    onClick={() => deleteMenuItem(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
