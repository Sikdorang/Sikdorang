import { axiosInstance } from '.';

export const AuthAPI = {
  kakaoLogin: async (authCode: string) => {
    const response = await axiosInstance.post('/auth/kakao/callback', {
      code: authCode,
    });
    return response.data;
  },

  logout: async () => {
    const res = await axiosInstance.post('/auth/logout');
    return res.data;
  },

  refresh: async () => {
    const res = await axiosInstance.post('/auth/refresh');
    return res.data.accessToken;
  },
};
