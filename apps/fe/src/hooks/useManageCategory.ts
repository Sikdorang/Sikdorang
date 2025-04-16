import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { MESSAGES } from '@/constants/messages';
import { CategoryAPI } from '@/services/category';
import { handelError } from '@/services/handleError';
import { ICategoryItem } from '@/types/model/category';

export const useManageCategory = () => {
  const [categories, setCategories] = useState<ICategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCategory = async (categoryName: string) => {
    if (categories.some((cat) => cat.category === categoryName)) {
      toast.error(MESSAGES.duplicatedCategoryError);
      return;
    }
    try {
      const newCategory = await CategoryAPI.addCategory(categoryName);
      setCategories((prev) => [...prev, newCategory]);
      toast.success(MESSAGES.createCategorySuccess);
      return newCategory;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setError(MESSAGES.badRequestError);
      } else if (error.response?.status === 401) {
        setError(MESSAGES.authenticationError);
      } else {
        handelError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await CategoryAPI.getCategories();
      setCategories(response);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setError(MESSAGES.authenticationError);
      } else {
        handelError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateCategory = async (categoryId: number, updatedCategory: string) => {
    try {
      const updatedCategoryResponse = await CategoryAPI.updateCategory(categoryId, updatedCategory);
      const updatedCategories = categories.map((category) =>
        category.id === categoryId ? updatedCategoryResponse : category,
      );
      setCategories(updatedCategories);
      toast.success(MESSAGES.updateCategorySuccess);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setError(MESSAGES.badRequestError);
      } else if (error.response?.status === 401) {
        setError(MESSAGES.authenticationError);
      } else if (error.response?.status === 404) {
        setError(MESSAGES.unknownCategoryError);
      } else {
        handelError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const removeCategory = async (categoryId: number) => {
    try {
      const responseMessage = await CategoryAPI.deleteCategory(categoryId);
      const updatedCategories = categories.filter((category) => category.id !== categoryId);
      setCategories(updatedCategories);
      toast.success(MESSAGES.deleteCategorySuccess);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setError(MESSAGES.badRequestError);
      } else if (error.response?.status === 401) {
        setError(MESSAGES.authenticationError);
      } else if (error.response?.status === 404) {
        setError(MESSAGES.unknownCategoryError);
      } else {
        handelError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { categories, isLoading, error, createCategory, fetchCategories, updateCategory, removeCategory };
};
