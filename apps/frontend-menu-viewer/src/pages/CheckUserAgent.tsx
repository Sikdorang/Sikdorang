import BaseResponsiveLayout from '@/components/common/BaseResponsiveLayout';
import LoadingView from '@/components/common/LoadingView';
import { ROUTES } from '@/constants/routes';
import { getDeviceType } from '@/utilities/parseUserAgent';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function CheckUserAgent() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectBasedOnDevice = () => {
      const deviceType = getDeviceType();
      const targetRoute =
        deviceType === 'mobile' ? ROUTES.STORES.DETAIL('12') : ROUTES.LOGIN;
      navigate(targetRoute);
    };

    const timer = setTimeout(redirectBasedOnDevice, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <BaseResponsiveLayout>
      <div className="h-screen flex items-center justify-center">
        <LoadingView />
      </div>
    </BaseResponsiveLayout>
  );
}
