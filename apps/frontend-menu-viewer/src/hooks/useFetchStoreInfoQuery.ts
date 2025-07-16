import { storeAPI } from '@/services/store/store.api';
import { useQuery } from '@tanstack/react-query';

export default function useFetchStoreInfoQuery(storeId: string) {
  return useQuery({
    queryKey: ['storeInfo', storeId],
    queryFn: () => storeAPI.fetchStoreInfo(storeId),
    enabled: !!storeId,
    retry: false,
  });
}
