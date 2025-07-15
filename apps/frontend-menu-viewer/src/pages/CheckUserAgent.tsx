import { getDeviceType } from '@/utils/parseUserAgent';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '../constants/routes';

export default function CheckUserAgent() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      const userAgent = getDeviceType();
      if (userAgent == 'mobile') navigate(ROUTES.STORES);
      else navigate(ROUTES.LOGIN);
    }, 500);
  }, []);
  return <div>체크 중...</div>;
}
