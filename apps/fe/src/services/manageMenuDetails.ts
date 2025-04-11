import { axiosInstance } from '.';

export const DetailsAPI = {
  getMenuDetails: async (menuId: number) => {
    const res = await axiosInstance.get(`/menus/${menuId}`);
    return res.data;
  },
};
