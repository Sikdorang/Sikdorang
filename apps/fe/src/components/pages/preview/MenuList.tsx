import MenuItem from '../../common/items/MenuItem';
import Link from 'next/link';
import { useQueryMenusByCategory } from '@/hooks/useQueryMenusByCategory';

interface MenuListProps {
  selectedCategoryId: number | null;
}

export default function MenuList({ selectedCategoryId }: MenuListProps) {
  const { menus } = useQueryMenusByCategory(selectedCategoryId!);

  return (
    <>
      {menus.map((item) => (
        <Link key={item.id} href={`/preview/${item.id}`}>
          <MenuItem item={item} />
        </Link>
      ))}
    </>
  );
}
