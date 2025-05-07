'use client';

import TopNav from '@/components/layout/headers/TopNav';
import CategorySidebar from '@/components/pages/preview/CategorySidebar';
import MenuSection from '@/components/pages/preview/MenuSection';
import SortableCategoryList from '@/components/pages/edit/SortableCategoryList';
import SidebarWithContentContainer from '@/components/layout/containers/SidebarWithContentContainer';
import SortableMenuList from '@/components/pages/edit/SortableMenuList';
import { useSortableItems } from '@/hooks/useSortableItems';
import { Suspense, useEffect, useState } from 'react';
import CategoryListSkeleton from '@/components/pages/preview/CategoryListSkeleton';
import { useQueryCategoriesAndMenus } from '@/hooks/useQueryCategoriesAndMenus';
import { CategoryAPI } from '@/services/category';
import { toast } from 'react-toastify';
import { MESSAGES } from '@/constants/messages';
import EditSaveButton from '@/components/pages/edit/EditSaveButton';
import { MenuAPI } from '@/services/menu';
import MenuListSkeleton from '@/components/pages/preview/MenuListSkeleton';
import { useMenuOrderStore } from '@/stores/useMenuOrderStore';
import { useQueryClient } from '@tanstack/react-query';

export default function Page() {
  const queryClient = useQueryClient();
  const { categoriesAndMenus } = useQueryCategoriesAndMenus();
  const setInitialData = useMenuOrderStore((s) => s.setInitialData);
  const menusMap = useMenuOrderStore((s) => s.menus);
  const handleMenuReorder = useMenuOrderStore((s) => s.handleReorder);
  const getChangedMenuItems = useMenuOrderStore.getState().getChangedItems;

  const categoriesAndMenusState = useSortableItems(categoriesAndMenus ?? []);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  useEffect(() => {
    if (categoriesAndMenus) {
      setInitialData(categoriesAndMenus);
      if (selectedCategoryId === null && categoriesAndMenus.length > 0) {
        setSelectedCategoryId(categoriesAndMenus[0].id);
      }
    }
  }, [categoriesAndMenus]);

  const selectedMenus = selectedCategoryId ? (menusMap.get(selectedCategoryId) ?? []) : [];

  const handleSave = async () => {
    const categoryChanges = categoriesAndMenusState.getChangedItems();
    const menuChanges = getChangedMenuItems();

    try {
      if (categoryChanges.length > 0) {
        await CategoryAPI.updateCategoriesOrder(categoryChanges);
        queryClient.invalidateQueries({ queryKey: ['categories'] });
      }
      if (menuChanges.length > 0) {
        await MenuAPI.updateMenusOrder(menuChanges);
        queryClient.invalidateQueries({ queryKey: ['menus'] });
      }

      toast.success(MESSAGES.OrderSaveSuccess);
    } catch (error) {
      toast.error(MESSAGES.orderSaveFailureError);
      console.error(error);
    }
  };

  return (
    <>
      <TopNav />
      <SidebarWithContentContainer>
        <CategorySidebar>
          <Suspense fallback={<CategoryListSkeleton />}>
            <SortableCategoryList
              items={categoriesAndMenusState.items}
              onReorder={categoriesAndMenusState.handleReorder}
              selectedCategoryId={selectedCategoryId ?? 0}
              onSelectCategory={(id) => setSelectedCategoryId(id)}
            />
          </Suspense>
        </CategorySidebar>
        <MenuSection>
          <Suspense fallback={<MenuListSkeleton />}>
            <SortableMenuList
              items={selectedMenus}
              onReorder={(oldIndex, newIndex) =>
                selectedCategoryId !== null && handleMenuReorder(selectedCategoryId, oldIndex, newIndex)
              }
            />
          </Suspense>
        </MenuSection>
      </SidebarWithContentContainer>
      <EditSaveButton onClick={handleSave} />
    </>
  );
}
