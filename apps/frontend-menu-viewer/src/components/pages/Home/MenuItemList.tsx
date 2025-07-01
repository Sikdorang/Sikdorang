import { Fragment } from 'react';
import MenuItem from './MenuItem';

interface Props {
  items: IMenu[];
}

export default function MenuItemList({ items }: Props) {
  return (
    <ul>
      {items.map(({ name, price, isNew, isPopular, imgUrl }, idx) => (
        <Fragment key={name + idx}>
          <MenuItem
            name={name}
            price={price}
            isNew={isNew}
            isPopular={isPopular}
            imageUrl={imgUrl}
          />
          {idx < items.length - 1 && <hr className="text-gray-100" />}
        </Fragment>
      ))}
    </ul>
  );
}
