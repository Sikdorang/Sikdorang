import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { MESSAGES } from '@/constants/messages';
import { AuthAPI } from '@/services/auth';
import { handelError } from '@/services/handleError';
import { STORAGE_KEYS } from '@/constants/storage';
import axios from 'axios';

export const useLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const submit = async (email: string, password: string) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const data = await AuthAPI.login(email, password);
      localStorage.setItem(STORAGE_KEYS.accessToken, data.accessToken);
      toast.success(MESSAGES.loginSuccess);
      router.push('/preview');
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
