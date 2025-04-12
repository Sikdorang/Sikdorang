import { CategoryAPI } from '@/services/category';
import { ICategoryItem } from '@/types/model/category';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useQueryCategories = () => {
  const { data: categories } = useSuspenseQuery<ICategoryItem[] | null>({
    queryKey: ['categories'],
    queryFn: () => CategoryAPI.getCategories(),
    staleTime: 1000 * 60 * 10,
  });

  return { categories };
};
