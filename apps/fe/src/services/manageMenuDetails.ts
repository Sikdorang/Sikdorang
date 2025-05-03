import { axiosInstance } from '.';

export type PatchMenuDetailsRequest = {
  preview?: string;
  details?: string;
  tags?: Array<{ id: number; tag: string }>;
  images?: Array<{ id: number; image_url: string; order: string }>;
};

export const DetailsAPI = {
  getMenuDetails: async (menuId: number) => {
    const res = await axiosInstance.get(`/menus/${menuId}`);
    return res.data;
  },

  updateMenuDetails: async (menuId: number, data: PatchMenuDetailsRequest) => {
    const res = await axiosInstance.patch(`/menus/${menuId}`, data);
    return res.data;
  },
};
