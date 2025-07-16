import { API_BASE_URL } from '../api';
import axios from 'axios';

export const storeAPI = {
  fetchStoreInfo: async (storeId: string): Promise<IStoreInfo> => {
    const response = await axios.get(`${API_BASE_URL}/stores/${storeId}`);
    return response.data;
  },
};
