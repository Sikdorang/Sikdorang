import { ISyncMenuRequest } from '@/types/model/menu';
import { axiosInstance } from '.';

export const MenuyAPI = {
  getMenus: async () => {
    const res = await axiosInstance.get('/menus');
    return res.data;
  },
  syncMenus: async (syncData: ISyncMenuRequest[]) => {
    const res = await axiosInstance.post('/menus', syncData);
    return res.data;
  },
  getMenuByCategory: async (category: string) => {
    const res = await axiosInstance.get(`/menus/board/${category}`);
    return res.data;
  },
};
