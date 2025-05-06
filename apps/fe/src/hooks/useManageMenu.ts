import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { MESSAGES } from '@/constants/messages';
import { handelError } from '@/services/handleError';
import { IManageMenuItem, ISyncMenuRequest } from '@/types/model/menu';
import { MenuAPI } from '@/services/menu';

export const useManageMenu = () => {
  const [menus, setMenus] = useState<IManageMenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMenus = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await MenuAPI.getMenus();
      if (Array.isArray(response)) {
        setMenus(response);
      } else {
        setMenus([]);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setError(MESSAGES.authenticationError);
      } else {
        handelError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const syncMenus = async (syncData: ISyncMenuRequest[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await MenuAPI.syncMenus(syncData);
      toast.success(MESSAGES.syncMenusSuccess);
      fetchMenus();
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handelError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { menus, isLoading, error, fetchMenus, syncMenus };
};
