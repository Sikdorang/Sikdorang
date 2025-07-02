import { getDeviceType } from '@/utils/parseUserAgent';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function CheckUserAgent() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      const userAgent = getDeviceType();
      if (userAgent == 'mobile') navigate('/store');
      else navigate('/login');
    }, 500);
  }, []);
  return <div>체크 중...</div>;
}
