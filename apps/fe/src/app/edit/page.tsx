'use client';

import TopNav from '@/components/layout/headers/TopNav';
import CategorySidebar from '@/components/pages/preview/CategorySidebar';
import MenuSection from '@/components/pages/preview/MenuSection';
import SortableCategoryList from '@/components/pages/edit/SortableCategoryList';
import SidebarWithContentContainer from '@/components/layout/containers/SidebarWithContentContainer';
import SortableMenuList from '@/components/pages/edit/SortableMenuList';

import { OrderAPI } from '@/services/order';
import { useSortableItems } from '@/hooks/useSortableItems';
import { Suspense } from 'react';
import CategoryListSkeleton from '@/components/pages/preview/CategoryListSkeleton';
import { useQueryCategories } from '@/hooks/useQueryCategories';
import { useQueryCategoriesAndMenus } from '@/hooks/useQueryCategoriesAndMenus';

export default function Page() {
  const { categories } = useQueryCategoriesAndMenus();
  const categoryState = useSortableItems(categories!);

  const handleSave = async () => {
    const categoryChanges = categoryState.getChangedItems();

    try {
      if (categoryChanges.length > 0) {
        await OrderAPI.updateOrder('categories', categoryChanges);
      }

      alert('저장 완료!');
    } catch (error) {
      console.error(error);
      alert('저장 실패');
    }
  };

  return (
    <>
      <TopNav />
      <SidebarWithContentContainer>
        <CategorySidebar>
          <Suspense fallback={<CategoryListSkeleton />}>
            <SortableCategoryList items={categoryState.items} onReorder={categoryState.handleReorder} />
          </Suspense>
        </CategorySidebar>
        <MenuSection>
          <SortableMenuList />
        </MenuSection>
      </SidebarWithContentContainer>
      <SaveButton onClick={handleSave} />
    </>
  );
}

function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="text-sm font-bold text-gray-800 fixed bottom-5 right-5 bg-white p-1 w-16 h-16 rounded-full shadow-2xl"
      onClick={onClick}
    >
      저장
    </button>
  );
}
