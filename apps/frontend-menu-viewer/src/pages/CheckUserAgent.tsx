import { ROUTES } from '../constants/routes';
import { getStoreId } from '../utilities/getStoreId';
import { getDeviceType } from '@/utilities/parseUserAgent';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function CheckUserAgent() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      const userAgent = getDeviceType();
      if (userAgent == 'mobile') navigate(ROUTES.STORES.DETAIL(getStoreId()));
      else navigate(ROUTES.LOGIN);
    }, 500);
  }, []);
  return <div>체크 중...</div>;
}
