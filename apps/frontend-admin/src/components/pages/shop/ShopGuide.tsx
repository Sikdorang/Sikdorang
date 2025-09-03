import { IInfoItem } from '../../../types/model/store';
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

const iconMapping = {
  openHour: BusinessHoursIcon,
  corkage: CorkageIcon,
  wifi: WifiIcon,
  toilet: ToiletIcon,
  phoneNumber: PhoneNumberIcon,
  naverPlace: NaverplaceIcon,
};

const titleMapping = {
  openHour: '영업시간',
  corkage: '콜키지',
  wifi: 'wifi',
  toilet: '화장실',
  phoneNumber: '전화번호',
  naverPlace: '네이버 플레이스',
};

interface ShopGuideProps {
  label?: string;
  labelClassName?: string;
  onEditClick: () => void;
  infoItems: IInfoItem[];
}

export default function ShopGuide({
  label = '제목',
  labelClassName = '',
  onEditClick,
  infoItems,
  ...rest
}: ShopGuideProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-2 mb-2">
        <div className="flex gap-2 grow-1">
          <div className={`text-mb-1 block text-gray-800 ${labelClassName}`}>
            {label}
          </div>
          <TooltipModalPresenter className="items-center justify-center">
            <InfoIcon width={20} height={20} />
          </TooltipModalPresenter>
        </div>
        <button
          className={`rounded-xl px-2 py-2 bg-gray-100 transition-all hover:bg-gray-200`}
          onClick={onEditClick}
        >
          <EditIcon width={18} height={18} />
        </button>
      </div>

      {infoItems && infoItems.length > 0 ? (
        <div className="w-full bg-gray-100 rounded-xl px-2 py-2">
          {infoItems.map((item) => {
            const icon = iconMapping[item.key as keyof typeof iconMapping];
            const title = titleMapping[item.key as keyof typeof titleMapping];

            if (!icon || !title) {
              return null;
            }

            const displayValue = item.value || '';

            return (
              <ShopGuideItem
                key={item.key}
                title={title}
                icon={icon}
                description={displayValue}
              />
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
