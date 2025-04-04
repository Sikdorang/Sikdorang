import CategorySidebar from '@/components/pages/preview/CategorySidebar';
import MenuSection from '@/components/pages/preview/MenuSection';

export default function Page() {
  return (
    <div className="wrapper mx-auto flex gap-4 sm:gap-6 lg:gap-10 m-12">
      <CategorySidebar />
      <MenuSection />
    </div>
  );
}
