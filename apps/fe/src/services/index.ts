import { STORAGE_KEYS } from '@/constants/storage';
import axios from 'axios';
import { getAccessTokenFromCookies } from './server';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.accessToken) : getAccessTokenFromCookies();

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
