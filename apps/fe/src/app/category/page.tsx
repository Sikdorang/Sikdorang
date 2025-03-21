'use client';

import React, { useState } from 'react';
import TopNav from '../../components/layout/Header/TopNav';

interface CategorieItem {
  id: number;
  name: string;
  isEditing: boolean; // 수정 상태 추가
}

export default function MenuPage() {
  const [categorieItems, setCategorieItems] = useState<CategorieItem[]>([
    { id: 1, name: '증류주', isEditing: false },
    { id: 2, name: '청주', isEditing: false },
    { id: 3, name: '탁주', isEditing: false },
    { id: 4, name: '맥주', isEditing: false },
  ]);

  const addCategoryItems = () => {
    setCategorieItems((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: '',
        isEditing: true, // 새로 추가된 카테고리는 바로 수정 가능 상태로 설정
      },
    ]);
  };

  const deleteMenuItem = (id: number) => {
    setCategorieItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateMenuItem = (id: number, field: keyof CategorieItem, value: string | boolean) => {
    setCategorieItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  return (
    <>
      <TopNav />
      <div className="pt-[70px] container mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">카테고리 등록</h1>
        </header>

        <div className="bg-blue-50 p-4 rounded mb-4">
          <p>카테고리 정보를 입력해주세요.</p>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">카테고리 목록</h2>
          <button onClick={addCategoryItems} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            + 메뉴 추가
          </button>
        </div>

        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-2 w-[5%]">#</th>
              <th className="border px-2 py-2 w-[25%]">메뉴명</th>
              <th className="border px-2 py-2 w-[10%]">관리</th>
            </tr>
          </thead>

          <tbody>
            {categorieItems.map((item, idx) => (
              <tr key={item.id}>
                <td className="border text-center">{idx + 1}</td>

                {/* 메뉴명 입력 */}
                <td className="border text-center">
                  <input
                    type="text"
                    value={item.name}
                    placeholder="메뉴명"
                    disabled={!item.isEditing} // 수정 가능 여부에 따라 비활성화
                    onChange={(e) => updateMenuItem(item.id, 'name', e.target.value)}
                    className={`w-full p-1 text-right ${item.isEditing ? 'bg-white' : 'bg-gray-100'}`}
                  />
                </td>

                {/* 관리 버튼 */}
                <td className="border text-center space-x-1">
                  {/* 수정/완료 버튼 */}
                  <button
                    onClick={
                      () => updateMenuItem(item.id, 'isEditing', !item.isEditing) // 상태 토글
                    }
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
