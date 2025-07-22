import StoreInfoDropDown from './StoreInfoDropDown';

interface Props {
  storeInfo?: IStoreInfo;
}

export default function StoreInfo({ storeInfo }: Props) {
  return (
    <div className="wrapper pb-3 pt-5">
      <div className="mb-3">
        <p className="text-ml-2 text-gray-500">테이블 번호 01</p>
        <h1 className="text-mt-1 text-gray-900">{storeInfo?.name}</h1>
      </div>
      <div>
        {storeInfo?.infoItems && storeInfo?.infoItems.length > 0 && (
          <StoreInfoDropDown items={storeInfo?.infoItems} />
        )}
      </div>
    </div>
  );
}
