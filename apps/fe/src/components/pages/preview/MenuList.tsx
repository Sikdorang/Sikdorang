import MenuItem from '../../common/items/MenuItem';
import { useQueryMenusByCategory } from '@/hooks/useQueryMenusByCategory';
import { IMenuItem } from '@/types/model/menu';

interface MenuListProps {
  selectedCategoryId: number | null;
  onClickItem?: (item: IMenuItem) => void;
}

export default function MenuList({ selectedCategoryId, onClickItem }: MenuListProps) {
  const { menus } = useQueryMenusByCategory(selectedCategoryId!);

  if (menus.length == 0) return <div className="text-sm text-gray-500">해당 카테고리에 속한 메뉴가 없습니다.</div>;

  return (
    <>
      {menus.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          onClick={() => {
            if (onClickItem) onClickItem(item);
          }}
        />
      ))}
    </>
  );
}
