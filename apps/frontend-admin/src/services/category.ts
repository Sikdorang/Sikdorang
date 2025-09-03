import { axiosInstance } from '.';

export const CategoryAPI = {
  getCategories: async () => {
    const res = await axiosInstance.get('/category');
    return res.data;
  },
  addCategory: async (category: string, order: string) => {
    const res = await axiosInstance.post('/category', {
      category,
      order,
    });
    return res.data;
  },
  updateCategory: async (categoryId: number, updatedCategory: string) => {
    const res = await axiosInstance.patch(`/category`, {
      categoryId,
      category: updatedCategory,
    });
    return res.data;
  },
  deleteCategory: async (categoryId: number) => {
    const res = await axiosInstance.delete(`/category/${categoryId}`);
    return res.data;
  },
};
