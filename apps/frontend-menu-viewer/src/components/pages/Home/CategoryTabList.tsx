import CategoryTabItem from './CategoryTabItem';

interface Props {
  groups: ICategoryGroup[];
  selectedId: string;
  onSelect: (index: string) => void;
}

export default function CategoryTabList({
  groups,
  selectedId,
  onSelect,
}: Props) {
  return (
    <div className="scrollbar-hide sticky top-12 max-w-xs overflow-x-auto bg-white py-3">
      <ul className="flex w-fit items-center gap-2 px-5">
        {groups.map(({ id, category, items }) => (
          <CategoryTabItem
            key={id}
            label={category}
            count={items.length ?? 0}
            selected={selectedId === id}
            onClick={() => onSelect(id)}
          />
        ))}
      </ul>
    </div>
  );
}
