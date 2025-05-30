import axios from 'axios';
import { axiosInstance } from '.';
import { IMenuImageItem, IMenuTagItem } from '../types/model/menu';

export type PatchMenuDetailsRequest = {
  preview?: string;
  details?: string;
  tags?: IMenuTagItem[];
  images?: IMenuImageItem[];
};

export type PresignedResponse = {
  url: string;
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

  getPresignedUrl: async (menuId: number, filename: string) => {
    const res = await axiosInstance.post<PresignedResponse>(`/s3/${menuId}`, { filename });
    return res.data;
  },

  uploadToS3: async (presignedUrl: string, file: File) => {
    await axios.put(presignedUrl, file, {
      headers: { 'Content-Type': file.type },
    });
  },
};
