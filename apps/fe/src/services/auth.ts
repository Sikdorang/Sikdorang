import { axiosInstance } from '.';

export const AuthAPI = {
  login: async (email: string, password: string) => {
    const res = await axiosInstance.post('/auth/login', {
      UserId: email,
      Password: password,
    });
    return res.data;
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
