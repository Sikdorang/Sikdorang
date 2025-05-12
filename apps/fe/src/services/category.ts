import { OrderUpdatePayload } from '@/types/model/payload';
import { axiosInstance } from '.';

export const CategoryAPI = {
  getCategories: async () => {
    const res = await axiosInstance.get('/categories');
    return res.data;
  },
  addCategory: async (category: string, order: string) => {
    const res = await axiosInstance.post('/categories', {
      category,
      order,
    });
    return res.data;
  },
  updateCategory: async (categoryId: number, updatedCategory: string) => {
    const res = await axiosInstance.patch(`/categories/${categoryId}`, {
      category: updatedCategory,
    });
    return res.data;
  },
  deleteCategory: async (categoryId: number) => {
    const res = await axiosInstance.delete(`/categories/${categoryId}`);
    return res.data;
  },
  updateCategoriesOrder: async (items: OrderUpdatePayload[]) => {
    const res = await axiosInstance.patch(`/categories/order`, items);
    return res.data;
  },
};
