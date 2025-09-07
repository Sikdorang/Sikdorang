import { API_BASE_URL } from '../api';
import axios from 'axios';

export const storeAPI = {
  fetchStoreInfo: async (): Promise<IStoreInfo> => {
    const response = await axios.get(`${API_BASE_URL}/store`);
    return response.data;
  },
};
