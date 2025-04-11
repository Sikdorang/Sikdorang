import { axiosInstance } from '.';

export const AuthAPI = {
  login: async (email: string, password: string) => {
    const res = await axiosInstance.post('/auth/login', {
      UserId: email,
      Password: password,
    });
    return res.data;
  },
};
