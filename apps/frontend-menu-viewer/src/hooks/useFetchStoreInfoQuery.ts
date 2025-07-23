import { storeAPI } from '@/apis/store/store.api';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function useFetchStoreInfoQuery(storeId: string) {
  return useSuspenseQuery({
    queryKey: ['storeInfo', storeId],
    queryFn: () => storeAPI.fetchStoreInfo(storeId),
    retry: false,
  });
}
