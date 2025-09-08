import axiosInstance from '..';
import { API_BASE_URL } from '../api';

export const authAPI = {
  verifyPin: async (pinNumber: string) => {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/user-tablet-auth/verify-pin`,
      { pinNumber },
    );
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/user-tablet-auth/logout`,
    );
    return response.data;
  },
};
