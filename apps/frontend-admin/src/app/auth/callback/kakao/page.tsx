'use client';

import Loading from '@/components/common/loading/Loading';
import { useLogin } from '@/hooks/useLogin';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function KakaoCallbackPage() {
  const searchParams = useSearchParams();
  const { kakaoLogin, isLoading, loginError } = useLogin();
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    const code = searchParams.get('code');

    if (code && !processed) {
      kakaoLogin(code).then(() => setProcessed(true));
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (loginError) {
    return <div className="text-red-500">{loginError}</div>;
  }

  return <Loading />;
}
