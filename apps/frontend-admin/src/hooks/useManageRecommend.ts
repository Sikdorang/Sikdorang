import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/messages';
import { handelError } from '@/services/handleErrors';
import { RecommendAPI } from '@/services/recommend';
import {
  RecommendationMenuItem,
  RecommendationMenusDto,
  RecommendationMode,
  RecommendationTypeData,
} from '@/types/request/recommend';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useManageRecommend = () => {
  const [isRecommendLoading, setIsRecommendLoading] = useState(true);
  const [recommendError, setRecommendError] = useState<string | null>(null);
  const [recommendationMode, setRecommendationMode] =
    useState<RecommendationMode | null>(null);
  const [recommendationMenus, setRecommendationMenus] =
    useState<RecommendationMenusDto>();

  const fetchRecommendationMenus = async () => {
    setIsRecommendLoading(true);
    try {
      const response = await RecommendAPI.getRecommendationMenus();
      setRecommendationMenus(response);
      console.log('fetchRecommendationMenus', response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setRecommendError(ERROR_MESSAGES.authenticationError);
        } else {
          handelError(error);
        }
      }
    } finally {
      setIsRecommendLoading(false);
    }
  };

  const updateRecommendationCategories = async (payload: {
    categoryId: number[];
  }) => {
    try {
      setIsRecommendLoading(true);
      await RecommendAPI.updateRecommendationCategories(payload);
      toast.success(SUCCESS_MESSAGES.updateCategorySuccess);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setRecommendError(ERROR_MESSAGES.badRequestError);
        } else if (error.response?.status === 401) {
          setRecommendError(ERROR_MESSAGES.authenticationError);
        } else {
          handelError(error);
        }
      }
      throw error;
    } finally {
      setIsRecommendLoading(false);
    }
  };

  const fetchRecommendationMode =
    async (): Promise<RecommendationMode | null> => {
      setIsRecommendLoading(true);
      let mode: RecommendationMode | null = null;
      try {
        const res = await RecommendAPI.getRecommendationMode();
        mode = res.recommendationMode;
        setRecommendationMode(mode);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            setRecommendError(ERROR_MESSAGES.authenticationError);
          } else {
            handelError(error);
          }
        }
      } finally {
        setIsRecommendLoading(false);
      }
      return mode;
    };

  const updateRecommendationMode = async (
    recommendationMode: RecommendationMode,
  ) => {
    try {
      const newRecommendationMode = await RecommendAPI.updateRecommendationMode(
        {
          recommendationMode,
        },
      );
      toast.success(SUCCESS_MESSAGES.updateRecommendationModeSuccess);
      return newRecommendationMode;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setRecommendError(ERROR_MESSAGES.badRequestError);
        } else if (error.response?.status === 401) {
          setRecommendError(ERROR_MESSAGES.authenticationError);
        } else {
          handelError(error);
        }
      }
    } finally {
      setIsRecommendLoading(false);
    }
  };

  const fetchRecommendationTypeData = async (
    recommendationTypeId: number,
  ): Promise<RecommendationTypeData | null> => {
    try {
      const res =
        await RecommendAPI.getRecommendationTypeData(recommendationTypeId);
      const data = res.data ?? res;
      console.log('fetchRecommendationTypeData', data);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setRecommendError(ERROR_MESSAGES.authenticationError);
        } else {
          handelError(error);
        }
      }
      return null;
    }
  };

  const updateRecommendationTypeMenus = async (
    recommendationTypeId: number,
    menuIds: number[],
  ) => {
    try {
      setIsRecommendLoading(true);
      await RecommendAPI.updateRecommendationTypeMenus(
        recommendationTypeId,
        menuIds,
      );
      toast.success(SUCCESS_MESSAGES.updateMenuSuccess);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setRecommendError(ERROR_MESSAGES.badRequestError);
        } else if (error.response?.status === 401) {
          setRecommendError(ERROR_MESSAGES.authenticationError);
        } else {
          handelError(error);
        }
      }
      throw error;
    } finally {
      setIsRecommendLoading(false);
    }
  };

  const fetchRecommendationTypeMenus = async (
    recommendationTypeId: number,
  ): Promise<RecommendationMenuItem[] | null> => {
    try {
      setIsRecommendLoading(true);
      const res =
        await RecommendAPI.getRecommendationTypeMenus(recommendationTypeId);

      const mapped = res.map((item: any) => ({
        id: item.menu.id,
        name: item.menu.name,
        price: item.menu.price,
        isNew: item.menu.isNew,
        isPopular: item.menu.isPopular,
        status: item.menu.status,
        order: item.menu.order,
      }));
      console.log('mapped TypeMenus', mapped);
      return mapped;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setRecommendError(ERROR_MESSAGES.authenticationError);
        } else {
          handelError(error);
        }
      }
      return null;
    } finally {
      setIsRecommendLoading(false);
    }
  };

  return {
    recommendationMenus,
    recommendationMode,
    fetchRecommendationMode,
    fetchRecommendationMenus,
    fetchRecommendationTypeData,
    fetchRecommendationTypeMenus,
    updateRecommendationMode,
    updateRecommendationCategories,
    updateRecommendationTypeMenus,
    isRecommendLoading,
    recommendError,
  };
};
