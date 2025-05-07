import MenuItem from '../../common/items/MenuItem';
import Link from 'next/link';
import { useQueryMenusByCategory } from '@/hooks/useQueryMenusByCategory';

interface MenuListProps {
  selectedCategoryId: number | null;
}

export default function MenuList({ selectedCategoryId }: MenuListProps) {
  const { menus } = useQueryMenusByCategory(selectedCategoryId!);

  if (menus.length == 0) return <div className="text-sm text-gray-500">해당 카테고리에 속한 메뉴가 없습니다.</div>;

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
