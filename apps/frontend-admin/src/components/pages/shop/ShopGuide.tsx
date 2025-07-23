import { TooltipModalPresenter } from '../../common/modals/TooltipModalPresenter';
import ShopGuideItem from './ShopGuideItem';
import CorkageIcon from '@public/icons/ic_bottle.svg';
import BusinessHoursIcon from '@public/icons/ic_clock.svg';
import InfoIcon from '@public/icons/ic_info.svg';
import NaverplaceIcon from '@public/icons/ic_naver.svg';
import EditIcon from '@public/icons/ic_pencil.svg';
import PhoneNumberIcon from '@public/icons/ic_phone.svg';
import ToiletIcon from '@public/icons/ic_toilet.svg';
import WifiIcon from '@public/icons/ic_wifi.svg';
import Image from 'next/image';

interface ShopGuideProps {
  label?: string;
  labelClassName?: string;
}

export default function ShopGuide({
  label = '제목',
  labelClassName = '',
  ...rest
}: ShopGuideProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-2 grow-1">
          <div
            className={`text-mobile-body-l-semibold block text-gray-800 ${labelClassName}`}
          >
            {label}
          </div>
          <TooltipModalPresenter>
            <Image src={InfoIcon} width={20} height={20} alt={''} />
          </TooltipModalPresenter>
        </div>
        <button className={`rounded-xl px-2 py-2 bg-gray-100`}>
          <Image src={EditIcon} width={18} height={18} alt="gallery" />
        </button>
      </div>

      <div className="w-full bg-gray-100 rounded-xl px-2 py-2">
        <ShopGuideItem
          title="영업시간"
          icon={BusinessHoursIcon}
          description="목 16:00-1:00"
        />
        <ShopGuideItem
          title="콜키지"
          icon={CorkageIcon}
          description="가능 (유료)"
        />
        <ShopGuideItem
          title="wifi"
          icon={WifiIcon}
          description="ID 00000000 / PW 11111111"
        />
        <ShopGuideItem
          title="화장실"
          icon={ToiletIcon}
          description="어뜨케어뜨케해서가묜됩니당"
        />
        <ShopGuideItem
          title="전화번호"
          icon={PhoneNumberIcon}
          description="02-1234-5678"
        />
        <ShopGuideItem
          title="네이버 플레이스"
          icon={NaverplaceIcon}
          description="https://naver.me/x9BNXkrc"
        />
      </div>
    </div>
  );
}
