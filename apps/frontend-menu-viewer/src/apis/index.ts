import { KEYS } from '@/constants/storage';
import axios, { type InternalAxiosRequestConfig } from 'axios';

export async function getAccessTokenFromLocalStorage(): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(KEYS.ACCESS_TOKEN);
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const attachAccessToken = (
  config: InternalAxiosRequestConfig,
  token: string,
) => {
  config.headers = config.headers ?? {};
  config.headers[KEYS.TABLET_AUTH_HEADER_KEY] = `Bearer ${token}`;
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
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // window.location.replace('/');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
