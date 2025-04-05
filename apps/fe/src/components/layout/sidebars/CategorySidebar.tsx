import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

import TextInput from '@/components/common/inputs/TextInput';
import MenuTextInput from '@/components/pages/menu/MenuTextInput';

import { MESSAGES } from '@/constants/messages';

import trashcanIcon from '@public/icons/ic_trashcan.svg';

interface CategorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  setCategories: (categories: string[]) => void;
}

export default function CategorySidebar({ isOpen, onClose, categories, setCategories }: CategorySidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [isComposing, setIsComposing] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [categoryError, setCategoryError] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  const handleDeleteCategory = (index: number) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };
  const handleAddCategory = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (event.target as HTMLInputElement).value.trim();

    if (isComposing) return;

    if (event.key === 'Enter' && inputValue) {
      event.preventDefault();

      if (categories.length >= 999) {
        setCategoryError(MESSAGES.maximumCategoryError);
        return;
      }

      if (categories.includes(inputValue)) {
        setCategoryError(MESSAGES.duplicatedCategoryError);
        return;
      }

      const updatedCategories = [...categories, inputValue];
      setCategories(updatedCategories);
      setCategoryError('');
      setNewCategory('');
    }
  };
  const handleSaveEdit = (index: number, newText: string) => {
    if (newText.trim() === '') return;
    const updated = [...categories];
    updated[index] = newText;
    setCategories(updated);
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full w-[300px] bg-white shadow-lg transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mt-17 p-4">
          <h2 className="text-title-sm-b">카테고리 관리</h2>
          <button
            onClick={onClose}
            className="text-label-xs-b text-gray-800 bg-gray-200 p-1 rounded-sm hover:bg-gray-300 focus:outline-none"
          >
            닫기
          </button>
        </div>

        <div className="p-4 overflow-y-auto scroll-smooth">
          <TextInput
            value={newCategory}
            placeholder="카테고리를 입력해 주세요"
            label="카테고리"
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={handleAddCategory}
            maxLength={12}
            errorMessage={categoryError ?? undefined}
          />

          <div className="text-label-xs-m text-gray-700 py-5">카테고리 목록</div>

          {categories && categories.length > 0 ? (
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index} className="flex justify-between items-center p-2 rounded-md">
                  <div className="flex items-center">
                    <div className="text-gray-500 text-label-xs-m border border-gray-200 px-1 mr-2">
                      {(index + 1).toString().padStart(3, '0')}
                    </div>

                    <MenuTextInput
                      variant="category"
                      defaultValue={category}
                      placeholder="카테고리"
                      onSave={(value) => handleSaveEdit(index, value)}
                      maxLength={12}
                    />
                  </div>

                  <button
                    className="text-red-500 border border-red-200 bg-red-100 p-1 rounded-sm hover:bg-red-200 focus:outline-none"
                    onClick={() => handleDeleteCategory(index)}
                  >
                    <Image className="w-3 h-3" src={trashcanIcon} alt="삭제" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="bg-gray-100 text-gray-400 text-body-xs-m text-center py-10 rounded-sm">
              추가된 카테고리가 없습니다
              <br />
              새로운 카테고리를 입력해 주세요
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
