import MenuItemList from './MenuItemList';

interface Props {
  category: string;
  items: IMenu[];
}

export default function CategoryMenuGroup({ category, items }: Props) {
  return (
    <li className="wrapper flex flex-col pt-3">
      <div className="flex items-center gap-1">
        <h2 className="text-mb-3 text-gray-800">{category}</h2>
        <span className="text-mb-3 text-gray-500">{items.length}</span>
      </div>
      <MenuItemList items={items} />
    </li>
  );
}
