import { menuAPI } from '@/apis/menu';
import { useQuery } from '@tanstack/react-query';

export default function useFetchMenuQuery() {
  return useQuery({
    queryKey: ['menus'],
    queryFn: () => menuAPI.fetchMenus(),
    retry: false,
  });
}
