import MenuItem from './MenuItem';
import emptyImage from '@/assets/images/img_empty_images.webp';
import { Fragment } from 'react';

const CDN_URL = import.meta.env.VITE_CDN_URL;

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
            imgUrl={imgUrl ? `${CDN_URL}/${imgUrl}` : emptyImage}
          />
          {idx < items.length - 1 && <hr className="text-gray-100 md:hidden" />}
        </Fragment>
      ))}
    </ul>
  );
}
