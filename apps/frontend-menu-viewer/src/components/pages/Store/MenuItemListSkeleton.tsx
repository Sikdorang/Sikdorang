import MenuItemSkeleton from './MenuItemSkeleton';
import { Fragment } from 'react';

export default function MenuItemListSkeleton() {
  const dummyArray = Array.from({ length: 4 });
  return (
    <ul className="grid grid-cols-1 md:my-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {dummyArray.map((_, idx) => (
        <Fragment key={idx}>
          <MenuItemSkeleton />
          {idx < dummyArray.length - 1 && (
            <hr className="text-gray-100 md:hidden" />
          )}
        </Fragment>
      ))}
    </ul>
  );
}
