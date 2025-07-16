import { menuAPI } from '@/apis/menu/menu.api';
import { useQuery } from '@tanstack/react-query';

export function useFetchMenusQuery() {
  return useQuery({
    queryKey: ['menus'],
    queryFn: () => menuAPI.fetchMenus(),
    retry: false,
  });
}
