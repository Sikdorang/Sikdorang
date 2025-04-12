'use client';

import SidebarWithContentContainer from '@/components/layout/containers/SidebarWithContentContainer';
import AdminButton from '@/components/pages/preview/AdminButton';
import CategoryList from '@/components/pages/preview/CategoryList';
import CategoryListSkeleton from '@/components/pages/preview/CategoryListSkeleton';
import CategorySidebar from '@/components/pages/preview/CategorySidebar';
import MenuList from '@/components/pages/preview/MenuList';
import MenuListSkeleton from '@/components/pages/preview/MenuListSkeleton';
import MenuSection from '@/components/pages/preview/MenuSection';
import { Suspense, useState } from 'react';

export default function Page() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  return (
    <div className="relative">
      <SidebarWithContentContainer>
        <CategorySidebar>
          <Suspense fallback={<CategoryListSkeleton />}>
            <CategoryList
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={(id) => setSelectedCategoryId(id)}
            />
          </Suspense>
        </CategorySidebar>
        <MenuSection>
          {selectedCategoryId === null ? (
            <MenuListSkeleton />
          ) : (
            <Suspense fallback={<MenuListSkeleton />}>
              <MenuList selectedCategoryId={selectedCategoryId} />
            </Suspense>
          )}
        </MenuSection>
      </SidebarWithContentContainer>
      <AdminButton />
    </div>
  );
}
