import { authAPI } from '../apis/auth/auth.api';
import { storeAPI } from '../apis/store/store.api';
import { ROUTES } from '../constants/routes';
import { KEYS } from '@/constants/storage';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (authCode: string) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const data = await authAPI.verifyPin(authCode);
      localStorage.setItem(KEYS.ACCESS_TOKEN, data.pinAccessToken);
      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setLoginError('잘못된 핀번호입니다.');
      } else {
        console.log('500');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.log('500', error);
    }
    navigate(ROUTES.ROOT);
  };

  const getStoreIdByPin = async () => {
    const store = await storeAPI.fetchStoreInfo();
    return store.id;
  };

  return {
    login,
    logout,
    getStoreIdByPin,
    isLoading,
    setIsLoading,
    loginError,
    setLoginError,
  };
};
