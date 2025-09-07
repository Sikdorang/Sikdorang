import { API_BASE_URL } from '../api';
import axios from 'axios';

export const authAPI = {
  verifyPin: async (pinNumber: string) => {
    const response = await axios.post(
      `${API_BASE_URL}/user-tablet-auth/verify-pin`,
      { pinNumber },
    );
    return response.data;
  },

  logout: async () => {
    const response = await axios.post(
      `${API_BASE_URL}/user-tablet-auth/logout`,
    );
    return response.data;
  },
};
