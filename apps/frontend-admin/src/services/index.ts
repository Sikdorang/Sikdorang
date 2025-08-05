import { AuthAPI } from './auth';
import { KEYS } from '@/constants/storage';
import axios, { InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

export async function getAccessTokenFromCookies() {
  if (typeof window !== 'undefined') return null;
  // 서버사이드에서 쿠키를 직접 읽어야 할 경우(Next.js app router)
  // 하지만 js-cookie는 클라이언트 전용이라 서버측에서는 기존 로직 그대로 유지 권장

  // 서버에서는 next/headers 또는 다른 서버 쿠키 접근법 사용
  // js-cookie는 브라우저 전용
  return null;
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
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};

axiosInstance.interceptors.request.use(
  async (config) => {
    let token: string | null = null;

    if (typeof window !== 'undefined') {
      token = Cookies.get(KEYS.ACCESS_TOKEN) ?? null;
    } else {
      // 서버에서는 기존 getAccessTokenFromCookies 함수 활용하거나 별도 처리
      token = await getAccessTokenFromCookies();
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
        }
        return axiosInstance(
          attachAccessToken(originalRequest, newAccessToken),
        );
      } catch (refreshError) {
        console.error('Refresh Token 실패', refreshError);
        if (typeof window !== 'undefined') {
          Cookies.remove(KEYS.ACCESS_TOKEN, { path: '/' });
          window.location.href = '/'; // 로그인 페이지로 redirect
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
