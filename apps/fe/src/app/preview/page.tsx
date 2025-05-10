'use client';

import SidebarWithContentContainer from '@/components/layout/containers/SidebarWithContentContainer';
import AdminButton from '@/components/pages/preview/AdminButton';
import CategoryList from '@/components/pages/preview/CategoryList';
import CategoryListSkeleton from '@/components/pages/preview/CategoryListSkeleton';
import CategorySidebar from '@/components/pages/preview/CategorySidebar';
import MenuList from '@/components/pages/preview/MenuList';
import MenuListSkeleton from '@/components/pages/preview/MenuListSkeleton';
import MenuModal from '@/components/pages/preview/MenuModal';
import MenuSection from '@/components/pages/preview/MenuSection';
import { IMenuItem } from '@/types/model/menu';
import { Suspense, useState } from 'react';

export default function Page() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<IMenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              <MenuList
                selectedCategoryId={selectedCategoryId}
                onClickItem={(item) => {
                  setSelectedMenu(item);
                  setIsModalOpen(true);
                }}
              />
            </Suspense>
          )}
        </MenuSection>
      </SidebarWithContentContainer>
      <AdminButton />
      {isModalOpen && selectedMenu && (
        <MenuModal item={selectedMenu} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
