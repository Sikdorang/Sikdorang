export type RecommendationMode = 'SIMPLE' | 'PRECISE';

export interface UpdateRecommendationModeDto {
  recommendationMode: RecommendationMode;
}
