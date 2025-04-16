import { axiosInstance } from '.';

export const CategoryAPI = {
  getCategories: async () => {
    const res = await axiosInstance.get('/categories');
    return res.data;
  },

  addCategory: async (category: string) => {
    const res = await axiosInstance.post('/categories', {
      category,
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
};
