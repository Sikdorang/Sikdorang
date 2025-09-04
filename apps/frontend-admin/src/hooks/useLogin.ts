import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/messages';
import { KEYS } from '@/constants/storage';
import { AuthAPI } from '@/services/auth';
import { handelError } from '@/services/handleErrors';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const kakaoLogin = async (authCode: string) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const data = await AuthAPI.kakaoLogin(authCode);

      document.cookie = `${KEYS.ACCESS_TOKEN}=${data.accessToken}; path=/; SameSite=Lax;`;
      document.cookie = `${KEYS.REFRESH_TOKEN}=${data.refreshToken}; path=/; SameSite=Lax;`;
      localStorage.setItem(KEYS.ACCESS_TOKEN, data.accessToken);
      localStorage.setItem(KEYS.REFRESH_TOKEN, data.refreshToken);

      toast.success(SUCCESS_MESSAGES.loginSuccess);
      router.push('/menu/edit');
      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setLoginError(ERROR_MESSAGES.invalidCredentials);
      } else {
        handelError(error);
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async () => {
    try {
      await AuthAPI.logout();
    } catch (error) {
      handelError(error);
    }
    router.push('/');
  };

  return {
    kakaoLogin,
    logout,
    isLoading,
    setIsLoading,
    loginError,
    setLoginError,
  };
};
