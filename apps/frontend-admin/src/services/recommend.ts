import { axiosInstance } from '.';
import { UpdateRecommendationModeDto } from '@/types/request/recommend';

export const RecommendAPI = {
  getRecommendationCategories: async () => {
    const res = await axiosInstance.get('/recommendation/category');
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
};
