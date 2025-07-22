import CategoryTabItem from './CategoryTabItem';
import type { RefObject } from 'react';

interface Props {
  data: ICategoryGroup[];
  selectedId: string | null;
  onTabClick: (id: string) => void;
  tabRefs: RefObject<Record<string, HTMLElement | null>>;
}

export default function CategoryTabList({
  data,
  selectedId,
  onTabClick,
  tabRefs,
}: Props) {
  return (
    <div className="scrollbar-hide sticky top-12 w-full overflow-x-auto bg-white py-3">
      <ul className="flex w-fit items-center gap-2 px-5 xl:mx-auto xl:w-full xl:max-w-5xl">
        {data.map(({ id, category, items }) => (
          <CategoryTabItem
            key={id}
            ref={(el) => {
              tabRefs.current[id] = el;
            }}
            label={category}
            count={items.length ?? 0}
            selected={selectedId === id}
            onClick={() => onTabClick(id)}
          />
        ))}
      </ul>
    </div>
  );
}
