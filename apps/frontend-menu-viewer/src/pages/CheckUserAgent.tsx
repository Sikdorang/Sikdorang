import { ROUTES } from '../constants/routes';
import { getStoreId } from '../utilities/getStoreId';
import { getDeviceType } from '../utilities/parseUserAgent';
import LoadingAnimation from '@/assets/lotties/lottie_loading.json';
import Lottie from 'lottie-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function CheckUserAgent() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      const userAgent = getDeviceType();
      if (userAgent == 'mobile') navigate(ROUTES.STORES.DETAIL(getStoreId()));
      else navigate(ROUTES.LOGIN);
    }, 1000);
  }, []);

  return (
    <div className="min-w-xs mx-auto w-full h-full wrapper flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-6">
          <Lottie animationData={LoadingAnimation} loop={true} />
        </div>
        <p className="text-mt-1 text-gray-900 mb-2.5 text-center">
          잠시만
          <br />
          기다려주세요
        </p>
        <p className="mb-6 text-mb-4 text-gray-700">거의 다 완료 했어요!</p>
      </div>
    </div>
  );
}
