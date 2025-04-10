import SidebarWithContentContainer from '@/components/layout/containers/SidebarWithContentContainer';
import AdminButton from '@/components/pages/preview/AdminButton';
import CategoryList from '@/components/pages/preview/CategoryList';
import CategorySidebar from '@/components/pages/preview/CategorySidebar';
import MenuList from '@/components/pages/preview/MenuList';
import MenuSection from '@/components/pages/preview/MenuSection';

export default function Page() {
  return (
    <div className="relative">
      <SidebarWithContentContainer>
        <CategorySidebar>
          <CategoryList />
        </CategorySidebar>
        <MenuSection>
          <MenuList />
        </MenuSection>
      </SidebarWithContentContainer>
      <AdminButton />
    </div>
  );
}
