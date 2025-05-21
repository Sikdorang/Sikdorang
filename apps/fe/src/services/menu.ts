import { ISyncMenuRequest } from '@/types/model/menu';
import { axiosInstance } from '.';
import { ICategoryWithMenus } from '@/types/model/category';
import { OrderUpdatePayload } from '@/types/model/payload';

export const MenuAPI = {
  getMenus: async () => {
    const res = await axiosInstance.get('/menus');
    return res.data;
  },
  deleteMenu: async (menuId: number) => {
    const res = await axiosInstance.delete(`/menus/${menuId}`);
    return res.data;
  },
  syncMenus: async (syncData: ISyncMenuRequest[]) => {
    const res = await axiosInstance.post('/menus', syncData);
    return res.data;
  },
  getMenusByCategory: async (category: string) => {
    const res = await axiosInstance.get(`/menus/board/${category}`);
    return res.data;
  },
  getMenusWithCategories: async (): Promise<ICategoryWithMenus[]> => {
    const res = await axiosInstance.get('/menus/board/admin');
    return res.data;
  },
  updateMenusOrder: async (items: OrderUpdatePayload[]) => {
    const res = await axiosInstance.patch(`/menus/order`, items);
    return res.data;
  },
};
