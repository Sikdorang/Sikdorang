import { menuAPI } from '@/services/menu/menu.api';
import { useQuery } from '@tanstack/react-query';

export function useFetchMenuDetailQuery(menuId: string) {
  return useQuery({
    queryKey: ['menuDetail', menuId],
    queryFn: () => menuAPI.fetchMenuDetail(menuId),
    enabled: !!menuId,
    retry: false,
  });
}
