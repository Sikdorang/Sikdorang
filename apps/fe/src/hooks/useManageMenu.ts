import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { MESSAGES } from '@/constants/messages';
import { MenuyAPI } from '@/services/manageMenu';
import { handelError } from '@/services/handleError';

export interface IMenu {
  id: number;
  menu: string;
  price: number;
  category: string;
  status: string;
  order: string;
}

export interface ISyncLog {
  action: 'create' | 'update' | 'delete';
  id: number;
  data: Record<string, any>;
}

export const useManageMenu = () => {
  const [menus, setMenus] = useState<IMenu[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMenus = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await MenuyAPI.getMenus();
      if (Array.isArray(response)) {
        setMenus(response);
      } else {
        setMenus([]);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setError(MESSAGES.authenticationError);
      } else {
        handelError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const syncMenus = async (syncData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await MenuyAPI.syncMenus(syncData);
      toast.success(MESSAGES.syncMenusSuccess);
      fetchMenus();
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        handelError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { menus, isLoading, error, fetchMenus, syncMenus };
};
