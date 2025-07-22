import MenuGroup from './MenuGroup';
import Divider from '@/components/common/Divider';
import type { RefObject } from 'react';

interface Props {
  data: ICategoryGroup[];
  groupRefs: RefObject<Record<string, HTMLElement | null>>;
}

export default function MenuGroupList({ data, groupRefs }: Props) {
  return (
    <ul>
      {data.map(({ id, category, items }, idx) => (
        <div
          key={id}
          data-id={id}
          ref={(el) => {
            groupRefs.current[id] = el;
          }}
        >
          <MenuGroup category={category} items={items} />
          {idx < data.length - 1 && (
            <div className="xl:mx-auto xl:max-w-5xl">
              <Divider />
            </div>
          )}
        </div>
      ))}
    </ul>
  );
}
