import { useSuspenseQuery } from '@tanstack/react-query';
import { MenuAPI } from '@/services/menu';
import { IMenuItem } from '@/types/model/menu';

export const useQueryMenusByCategory = (categoryId: number) => {
  const { data: menus } = useSuspenseQuery<IMenuItem[]>({
    queryKey: ['menus', categoryId.toString()],
    queryFn: () => MenuAPI.getMenusByCategory(categoryId.toString()),
    staleTime: 1000 * 60 * 10,
  });

  return { menus };
};
