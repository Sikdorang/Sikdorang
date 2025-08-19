import { axiosInstance } from '.';
import { UpdateStoreRequest } from '@/types/model/payload';

export const StoreInfoAPI = {
  getStoreInfos: async () => {
    const res = await axiosInstance.get('/store');
    return res.data;
  },

  updateStoreInfos: async (storeData: Partial<UpdateStoreRequest>) => {
    const res = await axiosInstance.patch('/store', storeData);
    return res.data;
  },
};
