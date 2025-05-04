import { MenuyAPI } from '@/services/menu';
import { ICategoryItem } from '@/types/model/category';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useQueryCategoriesAndMenus = () => {
  const { data: categories } = useSuspenseQuery<ICategoryItem[] | null>({
    queryKey: ['menus'],
    queryFn: () => MenuyAPI.getMenus(),
    staleTime: 1000 * 60 * 10,
  });

  return { categories };
};
