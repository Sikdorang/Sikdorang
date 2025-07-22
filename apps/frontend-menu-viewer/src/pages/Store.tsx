import BaseResponsiveLayout from '@/components/common/BaseResponsiveLayout';
import BottomSpace from '@/components/common/BottomSpace';
import Divider from '@/components/common/Divider';
import ErrorView from '@/components/common/ErrorView';
import StoreHeader from '@/components/pages/Store/StoreHeader';
import StoreInfoSection from '@/components/pages/Store/StoreInfoSection';
import StoreInfoSectionSkeleton from '@/components/pages/Store/StoreInfoSectionSkeleton';
import StoreMenuSection from '@/components/pages/Store/StoreMenuSection';
import StoreMenuSectionSkeleton from '@/components/pages/Store/StoreMenuSectionSkeleton';
import { Suspense } from 'react';
import { useParams } from 'react-router';

export default function Store() {
  const { storeId } = useParams<{ storeId: string }>();
  if (!storeId) return <ErrorView />;

  return (
    <BaseResponsiveLayout>
      <StoreHeader />
      <Suspense fallback={<StoreInfoSectionSkeleton />}>
        <StoreInfoSection storeId={storeId} />
      </Suspense>
      <div className="xl:mx-auto xl:max-w-5xl">
        <Divider />
      </div>
      <Suspense fallback={<StoreMenuSectionSkeleton />}>
        <StoreMenuSection />
      </Suspense>
      <BottomSpace />
    </BaseResponsiveLayout>
  );
}
