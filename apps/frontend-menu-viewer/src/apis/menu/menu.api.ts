import axios from 'axios';
import { API_BASE_URL } from '../api';

export const menuAPI = {
  // 가게별 메뉴 리스트 불러오기
  fetchMenus: async (): Promise<ICategoryGroup[]> => {
    const response = await axios.get(`${API_BASE_URL}/menus`);
    return response.data;
  },

  // 메뉴 상세 불러오기
  fetchMenuDetail: async (menuId: string): Promise<IMenuDetail> => {
    const response = await axios.get(`${API_BASE_URL}/menus/${menuId}`);
    return response.data;
  },
};
