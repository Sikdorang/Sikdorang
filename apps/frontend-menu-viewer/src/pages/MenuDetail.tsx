import BaseResponsiveLayout from '@/components/common/BaseResponsiveLayout';
import Header from '@/components/common/Header';
import MenuDetailSkeleton from '@/components/pages/MenuDetail/MenuDetailSkeleton';
import MenuSection from '@/components/pages/MenuDetail/MenuSection';
import useScrollToTop from '@/hooks/useScrollToTop';
import { Suspense } from 'react';
import { useParams } from 'react-router';

export default function MenuDetail() {
  useScrollToTop();

  const { menuId } = useParams<{ menuId: string }>();
  if (!menuId) throw new Error();

  return (
    <BaseResponsiveLayout>
      <Header title="메뉴보기" />
      <Suspense fallback={<MenuDetailSkeleton />}>
        <MenuSection menuId={menuId} />
      </Suspense>
    </BaseResponsiveLayout>
  );
}
