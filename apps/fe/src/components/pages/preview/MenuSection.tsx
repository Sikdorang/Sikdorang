import MenuList from './MenuList';

export default function MenuSection() {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
      <MenuList />
    </main>
  );
}
