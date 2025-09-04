export type RecommendationMode = 'SIMPLE' | 'PRECISE';

export interface UpdateRecommendationModeDto {
  recommendationMode: RecommendationMode;
}

export interface RecommendationMenuItem {
  id: number;
  name: string;
  price: number;
  isNew: boolean;
  isPopular: boolean;
  status: 'SALE' | 'SOLD_OUT' | 'HIDDEN';
  order: string;
}

export interface RecommendationMenusDto {
  categoryId: number;
  category: string;
  items: RecommendationMenuItem[];
}

export interface RecommendationTypeData {
  id: number;
  type: string;
  adminDescription: string;
  customerDescription: string;
  recommendationMode: 'SIMPLE' | 'PRECISE';
}
