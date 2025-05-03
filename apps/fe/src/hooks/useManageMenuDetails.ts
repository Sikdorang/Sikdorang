import axios from 'axios';
import { useState } from 'react';
import { MESSAGES } from '@/constants/messages';
import { toast } from 'react-toastify';
import { DetailsAPI, PatchMenuDetailsRequest } from '@/services/manageMenuDetails';
import { handelError } from '@/services/handleError';
import { IMenuDetailsItem } from '@/types/model/menu';

export const useManageMenuDetails = () => {
  const [menusDetails, setMenusDetails] = useState<IMenuDetailsItem>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenusDetails = async (menuId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await DetailsAPI.getMenuDetails(menuId);
      setMenusDetails(response);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setError(MESSAGES.emailRequired);
      } else {
        handelError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateMenuDetails = async (menuId: number, data: PatchMenuDetailsRequest) => {
    try {
      const response = await DetailsAPI.updateMenuDetails(menuId, data);
      toast.success(MESSAGES.syncMenuDetailsSuccess);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setError(MESSAGES.emailRequired);
      } else {
        handelError(error);
      }
      throw error;
    }
  };

  return { menusDetails, isLoading, error, fetchMenusDetails, updateMenuDetails };
};
