import { menuAPI } from '@/apis/menu/menu.api';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useFetchMenusQuery() {
  return useSuspenseQuery({
    queryKey: ['menus'],
    queryFn: () => menuAPI.fetchMenus(),
    retry: false,
  });
}
