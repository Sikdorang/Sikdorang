import { menuAPI } from '@/apis/menu/menu.api';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useFetchMenuDetailQuery(menuId: string) {
  return useSuspenseQuery<IMenuDetail>({
    queryKey: ['menuDetail', menuId],
    queryFn: () => menuAPI.fetchMenuDetail(menuId),
    retry: false,
  });
}
