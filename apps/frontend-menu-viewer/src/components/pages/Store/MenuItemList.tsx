import { Fragment } from 'react';
import MenuItem from './MenuItem';

interface Props {
  items: IMenuListItem[];
}

export default function MenuItemList({ items }: Props) {
  return (
    <ul className="grid grid-cols-1 md:my-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {items.map(({ id, name, price, isNew, isPopular, imgUrl }, idx) => (
        <Fragment key={name + idx}>
          <MenuItem
            id={id}
            name={name}
            price={price}
            isNew={isNew}
            isPopular={isPopular}
            imgUrl={imgUrl}
          />
          {idx < items.length - 1 && <hr className="text-gray-100 md:hidden" />}
        </Fragment>
      ))}
    </ul>
  );
}
