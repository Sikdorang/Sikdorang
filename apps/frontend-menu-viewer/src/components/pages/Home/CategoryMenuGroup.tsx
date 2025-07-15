import MenuItemList from './MenuItemList';

interface Props {
  category: string;
  items: IMenuListItem[];
}

export default function CategoryMenuGroup({ category, items }: Props) {
  return (
    <li className="wrapper flex flex-col pt-3">
      <h2 className="text-mb-3 text-gray-800">
        <span>{category}</span>
        <span className="text-mb-3 ml-1 text-gray-500">{items.length}</span>
      </h2>
      <MenuItemList items={items} />
    </li>
  );
}
