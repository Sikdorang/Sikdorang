import React, { useState, useEffect, useRef } from 'react';
import { useManageCategory } from '@/hooks/useManageCategory';
import { MESSAGES } from '@/constants/messages';
import { IManageMenuItem } from '@/types/model/menu';
import { LexoRank } from 'lexorank';
import { ICategoryItem } from '@/types/model/category';

import TextInput from '@/components/common/inputs/TextInput';
import MenuTextInput from '@/components/pages/menu/cells/MenuTextInput';
import Spinner from '@/components/common/loadings/Spinner';

import TrashcanIcon from '@public/icons/ic_trashcan.svg';
import { useQueryClient } from '@tanstack/react-query';
import { invalidateQueries } from '@/utilities/invalidateQuery';

interface CreateCategoryResponse {
  id: number;
  category: string;
}

interface CategorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  setTemporaryMenus: React.Dispatch<React.SetStateAction<IManageMenuItem[]>>;
  setTemporaryCategories: React.Dispatch<React.SetStateAction<ICategoryItem[]>>;
}

export default function CategorySidebar({
  isOpen,
  onClose,
  setTemporaryMenus,
  setTemporaryCategories,
}: CategorySidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { categories, isLoading, error, createCategory, fetchCategories, updateCategory, removeCategory } =
    useManageCategory();

  const [isComposing, setIsComposing] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen, fetchCategories]);

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

  const handleAddCategory = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (event.target as HTMLInputElement).value.trim();
    if (isComposing) return;
    if (event.key === 'Enter' && inputValue) {
      event.preventDefault();
      if (categories.length >= 999) {
        setCategoryError(MESSAGES.maximumCategoryError);
        return;
      }
      if (inputValue === '') {
        setCategoryError(MESSAGES.emptyCategoryError);
        return;
      }
      if (categories.some((cat) => cat.category === inputValue)) {
        setCategoryError(MESSAGES.duplicatedCategoryError);
        return;
      }

      let newOrder: string;
      if (categories.length === 0) {
        newOrder = LexoRank.middle().toString();
      } else {
        const lastOrder = categories[categories.length - 1].order;
        newOrder = LexoRank.parse(lastOrder).genNext().toString();
      }

      const response: CreateCategoryResponse = await createCategory(inputValue, newOrder);
      setTemporaryCategories((prevCategories) => [
        ...prevCategories,
        { id: response.id, category: response.category, order: newOrder },
      ]);
      setNewCategory('');
      setCategoryError(null);
      invalidateQueries(queryClient);
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    invalidateQueries(queryClient);
    await removeCategory(categoryId);
    const deletedCategory = categories.find((category) => category.id === categoryId)?.category;
    if (deletedCategory) {
      setTemporaryMenus((prevMenus) =>
        prevMenus.map((menu) => (menu.category === deletedCategory ? { ...menu, category: null } : menu)),
      );
      setTemporaryCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryId));
    }
  };

  const handleSaveEdit = async (
    event: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>,
    categoryId: number,
    updatedCategory: string,
  ) => {
    if (isComposing) return;
    invalidateQueries(queryClient);
    if ((event.type === 'keydown' && (event as React.KeyboardEvent).key === 'Enter') || event.type === 'blur') {
      if (event.type === 'keydown') {
        (event.target as HTMLInputElement).blur();
        return;
      }
      event.preventDefault?.();
      if (updatedCategory.trim() === '') return;
      await updateCategory(categoryId, updatedCategory);

      setTemporaryCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === categoryId ? { ...category, category: updatedCategory } : category,
        ),
      );
    }
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
            onChange={(e) => {
              setNewCategory(e.target.value);
              setCategoryError(null);
            }}
            onKeyDown={handleAddCategory}
            maxLength={12}
            errorMessage={categoryError || error || undefined}
            disabled={isLoading}
          />

          <div className="text-label-xs-m text-gray-700 py-5">카테고리 목록</div>

          {isLoading ? (
            <div className="flex justify-center items-center h-100">
              <Spinner className="border-blue-500 w-10 h-10" />
            </div>
          ) : categories == null || categories.length === 0 ? (
            <div className="bg-gray-100 text-gray-400 text-body-xs text-center py-10 rounded-sm">
              추가된 카테고리가 없습니다.\n새로운 카테고리를 입력해 주세요.
            </div>
          ) : (
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index} className="flex justify-between items-center p-2 rounded-md">
                  <div className="flex items-center">
                    <div className="text-gray-500 text-label-xs-m border border-gray-200 px-1 mr-2 select-none">
                      {(index + 1).toString().padStart(3, '0')}
                    </div>
                    <MenuTextInput
                      variant="category"
                      defaultValue={category.category}
                      placeholder="카테고리"
                      onCompositionStart={() => setIsComposing(true)}
                      onCompositionEnd={() => setIsComposing(false)}
                      onKeyDown={(event) => handleSaveEdit(event, category.id, event.currentTarget.value)}
                      onBlur={(event) => handleSaveEdit(event, category.id, event.currentTarget.value)}
                      maxLength={12}
                    />
                  </div>
                  <button
                    className="text-red-500 border border-red-200 bg-red-100 p-1 rounded-sm hover:bg-red-200 focus:outline-none"
                    onClick={() => handleDeleteCategory(category.id)}
                    disabled={isLoading}
                  >
                    <TrashcanIcon />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
