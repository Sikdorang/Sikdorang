import TopNav from '@/components/layout/headers/TopNav';
import CategorySidebar from '@/components/pages/preview/CategorySidebar';
import MenuSection from '@/components/pages/preview/MenuSection';
import SortableCategoryList from '@/components/pages/edit/SortableCategoryList';
import SidebarWithContentContainer from '@/components/layout/containers/SidebarWithContentContainer';
import SortableMenuList from '@/components/pages/edit/SortableMenuList';

export default function Page() {
  return (
    <>
      <TopNav />
      <SidebarWithContentContainer>
        <CategorySidebar>
          <SortableCategoryList />
        </CategorySidebar>
        <MenuSection>
          <SortableMenuList />
        </MenuSection>
      </SidebarWithContentContainer>
    </>
  );
}
