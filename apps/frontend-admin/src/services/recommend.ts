import { axiosInstance } from '.';
import { UpdateRecommendationModeDto } from '@/types/request/recommend';

export const RecommendAPI = {
  getRecommendationMenus: async () => {
    const res = await axiosInstance.get('/recommendation/category');
    return res.data;
  },

  getRecommendationMode: async () => {
    const res = await axiosInstance.get(
      '/recommendation/recommendationTypeData',
    );
    return res.data;
  },

  updateRecommendationMode: async (
    recommendationMode: UpdateRecommendationModeDto,
  ) => {
    const res = await axiosInstance.post(
      '/recommendation/recommendationMode',
      recommendationMode,
    );
    return res.data;
  },
  updateRecommendationCategories: async (categoryIds: {
    categoryId: number[];
  }) => {
    const res = await axiosInstance.put('/recommendation/category', {
      categoryId: categoryIds.categoryId,
    });
    return res.data;
  },

  getRecommendationTypeData: async (recommendationTypeId: number) => {
    const res = await axiosInstance.get(
      `/recommendation/recommendationTypeData/${recommendationTypeId}`,
    );
    return res.data;
  },

  getRecommendationTypeMenus: async (recommendationTypeId: number) => {
    const res = await axiosInstance.get(
      `/recommendation/recommendation-menu/${recommendationTypeId}`,
    );
    return res.data;
  },

  updateRecommendationTypeMenus: async (
    recommendationTypeId: number,
    menuIds: number[],
  ) => {
    const res = await axiosInstance.put(
      `/recommendation/recommendation-menu/${recommendationTypeId}`,
      { menuId: menuIds },
    );
    return res.data;
  },
};
