import StoreInfo from './StoreInfo';
import ErrorView from '@/components/common/ErrorView';
import useFetchStoreInfoQuery from '@/hooks/useFetchStoreInfoQuery';

interface Props {
  storeId: string;
}

export default function StoreInfoSection({ storeId }: Props) {
  const { data, isError } = useFetchStoreInfoQuery(storeId);

  if (isError) return <ErrorView />;
  return <StoreInfo storeInfo={data} />;
}
