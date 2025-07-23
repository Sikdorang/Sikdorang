import Carousel from './Carousel';
import Chip from '@/components/common/Chip';
import QuantityCounter from '@/components/common/QuantityCounter';
import { formatNumber } from '@/utilities/format';

interface Props {
  menu: IMenuDetail;
  quantity: number;
  setQuantity: (q: number) => void;
}

export default function MenuInfo({ menu, quantity, setQuantity }: Props) {
  return (
    <div className="wrapper">
      <div className="mb-3 mt-6">
        <Carousel imgUrls={menu.imgUrls} />
      </div>
      {(menu.isNew || menu.isPopular) && (
        <div className="mb-2 flex items-center gap-1">
          {menu.isNew && <Chip label="신메뉴" color="green" />}
          {menu.isPopular && <Chip label="인기" color="red" />}
        </div>
      )}
      <h1 className="text-mb-3 text-gray-700">{menu.name}</h1>
      <p className="text-mb-4 mb-3 text-gray-700">{menu.description}</p>
      <div className="mb-6 flex items-center justify-between">
        <div className="text-mb-1 text-gray-800">
          {formatNumber(menu.price ?? 0)}원
        </div>
        <QuantityCounter value={quantity} onChange={setQuantity} />
      </div>
    </div>
  );
}
