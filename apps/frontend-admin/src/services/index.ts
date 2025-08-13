import { AuthAPI } from './auth';
import { KEYS } from '@/constants/storage';
import axios, { InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

export async function getAccessTokenFromLocalStorage() {
  if (typeof window === 'undefined') return null;

  const accessToken = localStorage.getItem(KEYS.ACCESS_TOKEN);
  return accessToken;
}

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

const attachAccessToken = (
  config: InternalAxiosRequestConfig,
  token: string,
) => {
  config.headers = config.headers ?? {};
  config.headers[KEYS.ADMIN_AUTH_HEADER_KEY] = `Bearer ${token}`;
  return config;
};

axiosInstance.interceptors.request.use(
  async (config) => {
    let token: string | null = null;

    if (typeof window !== 'undefined') {
      token = localStorage.getItem(KEYS.ACCESS_TOKEN);
    } else {
      const { cookies } = require('next/headers');
      const cookieStore = await cookies();
      token = cookieStore.get(KEYS.ACCESS_TOKEN)?.value ?? null;
    }

    return token ? attachAccessToken(config, token) : config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/auth/refresh'
    ) {
      console.log('accessToken이 만료되었습니다.');
      originalRequest._retry = true;

      try {
        const newAccessToken = await AuthAPI.refresh();

        if (typeof window !== 'undefined') {
          Cookies.set(KEYS.ACCESS_TOKEN, newAccessToken, {
            path: '/',
            sameSite: 'lax',
            // secure: true, // HTTPS사용 시 활성화 권장
            // expires: 7 // 필요 시 만료 기간 설정
          });
          localStorage.setItem(KEYS.ACCESS_TOKEN, newAccessToken);
        }
        return axiosInstance(
          attachAccessToken(originalRequest, newAccessToken),
        );
      } catch (refreshError) {
        console.error('Refresh Token 실패', refreshError);
        if (typeof window !== 'undefined') {
          // Cookies.remove(KEYS.ACCESS_TOKEN, { path: '/' });
          window.location.href = '/';
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
