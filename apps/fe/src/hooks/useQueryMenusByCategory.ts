import { useSuspenseQuery } from '@tanstack/react-query';
import { MenuyAPI } from '@/services/menu';
import { IMenuItem } from '@/types/model/menu';

export const useQueryMenusByCategory = (categoryId: number) => {
  const { data: menus } = useSuspenseQuery<IMenuItem[]>({
    queryKey: ['menus', categoryId.toString()],
    queryFn: () => MenuyAPI.getMenuByCategory(categoryId.toString()),
    staleTime: 1000 * 60 * 10,
  });

  return { menus };
};
