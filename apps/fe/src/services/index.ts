import { KEYS } from '@/constants/storage';
import axios, { InternalAxiosRequestConfig } from 'axios';
import { AuthAPI } from './auth';
import { getAccessTokenFromCookies } from './server';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

const attachAccessToken = (config: InternalAxiosRequestConfig, token: string) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem(KEYS.ACCESS_TOKEN) : await getAccessTokenFromCookies();

    return token ? attachAccessToken(config, token) : config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('만료됨');
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/refresh') {
      originalRequest._retry = true;

      try {
        const newAccessToken = await AuthAPI.refresh();
        localStorage.setItem(KEYS.ACCESS_TOKEN, newAccessToken);
        document.cookie = `${KEYS.ACCESS_TOKEN}=${newAccessToken}; path=/; SameSite=Lax;`;
        return axiosInstance(attachAccessToken(originalRequest, newAccessToken));
      } catch (refreshError) {
        console.error('Refresh Token 실패', refreshError);
        localStorage.removeItem(KEYS.ACCESS_TOKEN);
        document.cookie = `${KEYS.ACCESS_TOKEN}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        window.location.href = '/'; // 로그인 페이지로 redirect
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
