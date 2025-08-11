import { axiosInstance } from '.';
import { ISyncMenuRequest } from '@/types/model/menu';

export const MenuAPI = {
  getAllMenus: async () => {
    const res = await axiosInstance.get('/menu/menus');
    return res.data;
  },

  deleteMenus: async (menuId: number) => {
    const res = await axiosInstance.delete(`/menu/${menuId}`);
    return res.data;
  },

  updateMenus: async (syncData: ISyncMenuRequest[]) => {
    const res = await axiosInstance.patch('/menu', syncData);
    return res.data;
  },

  createMenus: async (syncData: ISyncMenuRequest[]) => {
    const res = await axiosInstance.post('/menu', syncData);
    return res.data;
  },

  getMenuDetails: async (menuId: number) => {
    const res = await axiosInstance.get(`/menu/${menuId}`);
    return res.data;
  },

  updateMenuDetails: async (menuId: number) => {
    const res = await axiosInstance.patch(`/menu/${menuId}`);
    return res.data;
  },

  updateMenuOptions: async (menuId: number) => {
    const res = await axiosInstance.post(`/menu/option`);
    return res.data;
  },

  updateMenuImages: async (menuId: number) => {
    const res = await axiosInstance.post(`/menu/${menuId}/image`);
    return res.data;
  },
};
