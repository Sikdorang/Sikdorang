import axios from 'axios';
import { API_BASE_URL } from './api';

export const menuAPI = {
  fetchMenus: async (): Promise<ICategoryGroup[]> => {
    const response = await axios.get(`${API_BASE_URL}/menus`);
    return response.data;
  },
};
