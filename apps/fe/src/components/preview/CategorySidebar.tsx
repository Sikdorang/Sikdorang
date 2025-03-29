import CategoryList from './CategoryList';

export default function CategorySidebar() {
  return (
    <aside className="sticky top-16 h-screen overflow-y-auto w-full max-w-36 sm:max-w-40 lg:max-w-48 transition-[max-width] duration-300 ease-in-out scroll-hide">
      <CategoryList />
    </aside>
  );
}
