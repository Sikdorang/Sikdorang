import StoreInfo from './StoreInfo';
import useFetchStoreInfoQuery from '@/hooks/useFetchStoreInfoQuery';

interface Props {
  storeId: string;
}

export default function StoreInfoSection({ storeId }: Props) {
  const { data } = useFetchStoreInfoQuery(storeId);

  return <StoreInfo storeInfo={data} />;
}
