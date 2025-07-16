import ChervonDownSvg from '@/assets/icons/ic_chervon_down.svg?react';
import ChervonUpSvg from '@/assets/icons/ic_chervon_up.svg?react';
import DrinkSvg from '@/assets/icons/ic_drink.svg?react';
import NaverSvg from '@/assets/icons/ic_naver.svg?react';
import PhoneSvg from '@/assets/icons/ic_phone.svg?react';
import TimeSvg from '@/assets/icons/ic_time.svg?react';
import ToiletSvg from '@/assets/icons/ic_toilet.svg?react';
import WifiSvg from '@/assets/icons/ic_wifi.svg?react';
import { useState, type ReactNode } from 'react';

const StoreInfoMap: Record<
  StoreInfoType,
  {
    label: string;
    icon: ReactNode;
  }
> = {
  openHour: {
    label: '영업시간',
    icon: <TimeSvg />,
  },
  toilet: {
    label: '화장실',
    icon: <ToiletSvg />,
  },
  wifi: {
    label: 'wifi',
    icon: <WifiSvg />,
  },
  corkage: {
    label: '콜키지',
    icon: <DrinkSvg />,
  },
  naverPlace: {
    label: '네이버 플레이스',
    icon: <NaverSvg />,
  },
  phone: {
    label: '전화번호',
    icon: <PhoneSvg />,
  },
};

interface Props {
  items: IStoreInfoItem[];
}

export default function StoreInfoDropDown({ items }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen((prev) => !prev)}
      className="rounded-2xl bg-gray-100 p-4"
    >
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-mb-3 text-gray-700">매장 이용 가이드</h2>

        {open ? (
          <ChervonUpSvg className="text-gray-700" />
        ) : (
          <ChervonDownSvg className="text-gray-700" />
        )}
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => {
          const info = StoreInfoMap[item.key];
          if (!info) return null;

          return (
            <div
              key={idx}
              className={`flex flex-wrap items-center gap-2 transition-all duration-300 ${!open && idx >= 3 ? 'hidden' : 'block'}`}
            >
              <div className="flex flex-wrap aspect-square w-6 items-center justify-center text-gray-400">
                {info.icon}
              </div>
              <p className="flex flex-1 flex-wrap items-center gap-1">
                <span className="text-mb-5 text-gray-700 ">{info.label}</span>
                <div className="rounded-full bg-gray-200 w-[3px] h-[3px]"></div>
                <span
                  className={` text-mb-6 flex-1 text-gray-700 ${!open ? 'line-clamp-1' : 'break-all whitespace-break-spaces'}`}
                >
                  {item.value}
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
