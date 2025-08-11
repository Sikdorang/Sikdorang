import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/messages';
import { CategoryAPI } from '@/services/category';
import { handelError } from '@/services/handleErrors';
import { ICategoryItem } from '@/types/model/category';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

export const useManageCategory = () => {
  const [categories, setCategories] = useState<ICategoryItem[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const createCategory = async (categoryName: string, order: string) => {
    if (categories.some((cat) => cat.category === categoryName)) {
      toast.error(ERROR_MESSAGES.duplicatedCategoryError);
      return;
    }
    try {
      const newCategory = await CategoryAPI.addCategory(categoryName, order);
      setCategories((prev) => [...prev, newCategory]);
      toast.success(SUCCESS_MESSAGES.createCategorySuccess);
      return newCategory;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setCategoryError(ERROR_MESSAGES.badRequestError);
        } else if (error.response?.status === 401) {
          setCategoryError(ERROR_MESSAGES.authenticationError);
        } else {
          handelError(error);
        }
      }
    } finally {
      setIsCategoriesLoading(false);
    }
  };

  const fetchCategories = useCallback(async () => {
    setIsCategoriesLoading(true);
    setCategoryError(null);
    try {
      const response = await CategoryAPI.getCategories();
      setCategories(response);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setCategoryError(ERROR_MESSAGES.authenticationError);
      } else {
        handelError(error);
      }
    } finally {
      setIsCategoriesLoading(false);
    }
  }, [setIsCategoriesLoading, setCategoryError, setCategories, handelError]);

  const updateCategory = async (
    categoryId: number,
    updatedCategory: string,
  ) => {
    try {
      const updatedCategoryResponse = await CategoryAPI.updateCategory(
        categoryId,
        updatedCategory,
      );
      const updatedCategories = categories.map((category) =>
        category.id === categoryId ? updatedCategoryResponse : category,
      );
      setCategories(updatedCategories);
      toast.success(SUCCESS_MESSAGES.updateCategorySuccess);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setCategoryError(ERROR_MESSAGES.badRequestError);
        } else if (error.response?.status === 401) {
          setCategoryError(ERROR_MESSAGES.authenticationError);
        } else if (error.response?.status === 404) {
          setCategoryError(ERROR_MESSAGES.unknownCategoryError);
        } else {
          handelError(error);
        }
      }
    } finally {
      setIsCategoriesLoading(false);
    }
  };

  const removeCategory = async (categoryId: number) => {
    try {
      await CategoryAPI.deleteCategory(categoryId);
      const updatedCategories = categories.filter(
        (category) => category.id !== categoryId,
      );
      setCategories(updatedCategories);
      toast.success(SUCCESS_MESSAGES.deleteCategorySuccess);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setCategoryError(ERROR_MESSAGES.badRequestError);
        } else if (error.response?.status === 401) {
          setCategoryError(ERROR_MESSAGES.authenticationError);
        } else if (error.response?.status === 404) {
          setCategoryError(ERROR_MESSAGES.unknownCategoryError);
        } else {
          handelError(error);
        }
      }
    } finally {
      setIsCategoriesLoading(false);
    }
  };

  return {
    categories,
    isCategoriesLoading,
    categoryError,
    createCategory,
    fetchCategories,
    updateCategory,
    removeCategory,
  };
};
