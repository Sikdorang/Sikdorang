import { MenuAPI } from '@/services/menu';
import { ICategoryWithMenus } from '@/types/model/category';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useQueryCategoriesAndMenus = () => {
  const { data: categoriesAndMenus } = useSuspenseQuery<ICategoryWithMenus[] | null>({
    queryKey: ['menus'],
    queryFn: () => MenuAPI.getMenusWithCategories(),
    staleTime: 1000 * 60 * 10,
  });

  return { categoriesAndMenus };
};
