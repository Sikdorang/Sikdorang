import axiosInstance from '..';
import { API_BASE_URL } from '../api';

export const menuAPI = {
  // 가게별 메뉴 리스트 불러오기
  fetchMenus: async (): Promise<ICategoryGroup[]> => {
    const response = await axiosInstance.get(`${API_BASE_URL}/menu/menus`);
    return response.data;
  },

  // 메뉴 상세 불러오기
  fetchMenuDetail: async (menuId: string): Promise<IMenuDetail> => {
    const response = await axiosInstance.get(`${API_BASE_URL}/menu/${menuId}`);
    console.log('response', response);
    return response.data;
  },

  // 메뉴 여러 개 불러오기
  fetchMenuDetailsWithId: async (
    menuIds: string[],
  ): Promise<Record<string, IMenuDetail>> => {
    const response = await axiosInstance.post(`${API_BASE_URL}/menus/by-ids`, {
      menuIds,
    });
    return response.data.menus;
  },
};
