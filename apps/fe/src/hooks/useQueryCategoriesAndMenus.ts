import { MenuAPI } from '@/services/menu';
import { ICategoryWithMenus } from '@/types/model/category';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useQueryCategoriesAndMenus = () => {
  const { data: categoriesAndMenus } = useSuspenseQuery<ICategoryWithMenus[] | null>({
    queryKey: ['categoriesAndMenus'],
    queryFn: () => MenuAPI.getMenusWithCategories(),
    staleTime: 0,
    gcTime: 0,
  });

  return { categoriesAndMenus };
};
