import { KEYS } from '@/constants/storage';
import axios, { type InternalAxiosRequestConfig } from 'axios';

export async function getAccessTokenFromLocalStorage(): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(KEYS.ACCESS_TOKEN);
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

const attachAccessToken = (
  config: InternalAxiosRequestConfig,
  token: string,
) => {
  config.headers = config.headers ?? {};
  config.headers[KEYS.MOBILE_AUTH_HEADER_KEY] = `Bearer ${token}`;
  return config;
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getAccessTokenFromLocalStorage();
    return token ? attachAccessToken(config, token) : config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default axiosInstance;
