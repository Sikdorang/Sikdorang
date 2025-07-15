import ChervonRightSvg from '@/assets/icons/ic_chervon_right.svg?react';

interface StoreInfoItem {
  icon?: React.ReactNode;
  label: string;
  value: string;
}

interface Props {
  items: StoreInfoItem[];
}

export default function StoreInfoDropDown({ items }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-mb-3 text-gray-700">매장 안내·서비스</h2>
        <ChervonRightSvg className="text-gray-700" />
      </div>

      <div className="grid grid-cols-1 gap-2 rounded-2xl bg-gray-100 p-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-wrap items-center gap-2">
            <div className="flex aspect-square w-6 items-center justify-center rounded-full bg-white">
              {item.icon}
            </div>
            <p className="flex flex-wrap items-center gap-1">
              <span className="text-mb-5 text-gray-700">{item.label}</span>
              <span className="text-mb-6 text-gray-700">{item.value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
