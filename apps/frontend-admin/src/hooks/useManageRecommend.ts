import { RecommendationMode } from '../types/request/recommend';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/messages';
import { handelError } from '@/services/handleErrors';
import { RecommendAPI } from '@/services/recommend';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useManageRecommend = () => {
  const [isRecommendLoading, setIsRecommendLoading] = useState(true);
  const [recommendError, setRecommendError] = useState<string | null>(null);
  const [recommendationMenus, setRecommendationMenus] = useState<
    RecommendationMenu[]
  >([]);

  const fetchRecommendationCategories = async () => {
    setIsRecommendLoading(true);
    try {
      const response = await RecommendAPI.getRecommendationCategories();
      setRecommendationMenus(response);
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

  return {
    fetchRecommendationCategories,
    updateRecommendationMode,
    updateRecommendationCategories,
    isRecommendLoading,
    recommendError,
  };
};
