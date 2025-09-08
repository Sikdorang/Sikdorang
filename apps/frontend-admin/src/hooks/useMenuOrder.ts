import { OrderResponse } from '../types/response/order';
import { ERROR_MESSAGES } from '@/constants/messages';
import { handelError } from '@/services/handleErrors';
import { OrderAPI } from '@/services/order';
import axios from 'axios';
import { useState } from 'react';

export const useMenuOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [menuOrderError, setMenuOrderError] = useState<string | null>(null);
  const [menuOrder, setMenuOrder] = useState<OrderResponse[]>([]);

  const fetchMenuOrder = async () => {
    setIsLoading(true);
    setMenuOrderError(null);
    try {
      const response = await OrderAPI.getOrder();
      setMenuOrder(response.orders);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setMenuOrderError(ERROR_MESSAGES.authenticationError);
      } else {
        handelError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    menuOrderError,
    menuOrder,
    setMenuOrder,
    fetchMenuOrder,
  };
};
