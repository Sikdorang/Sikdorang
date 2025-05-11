import { useState } from 'react';
import { toast } from 'react-toastify';
import { MESSAGES } from '@/constants/messages';
import { AuthAPI } from '@/services/auth';
import { handelError } from '@/services/handleError';
import { KEYS } from '@/constants/storage';
import axios from 'axios';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const submit = async (email: string, password: string) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const data = await AuthAPI.login(email, password);
      document.cookie = `${KEYS.ACCESS_TOKEN}=${data.accessToken}; path=/; SameSite=Lax;`;
      localStorage.setItem(KEYS.ACCESS_TOKEN, data.accessToken);
      toast.success(MESSAGES.loginSuccess);
      window.location.href = '/menu';
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setLoginError(MESSAGES.invalidCredentials);
      } else {
        handelError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submit,
    isLoading,
    setIsLoading,
    loginError,
    setLoginError,
  };
};
