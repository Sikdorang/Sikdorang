import axiosInstance from '..';
import { API_BASE_URL } from '../api';

export const storeAPI = {
  fetchStoreInfo: async (): Promise<IStoreInfo> => {
    const response = await axiosInstance.get(`${API_BASE_URL}/store`);
    // console.log('response', response);
    return response.data;
  },
};
