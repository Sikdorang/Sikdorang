'use client';

import Loading from '@/components/common/loading/Loading';
import { useLogin } from '@/hooks/useLogin';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function KakaoCallbackPage() {
  const searchParams = useSearchParams();
  const { kakaoLogin, isLoading, loginError } = useLogin();
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    console.log(code);

    if (error) {
      toast.error('카카오 로그인이 취소되었거나 실패했습니다.');
      setProcessed(true);
      return;
    }

    if (code && !processed) {
      kakaoLogin(code).then(() => setProcessed(true));
    }
  }, [searchParams, kakaoLogin, processed]);

  if (isLoading) {
    return <Loading />;
  }

  if (loginError) {
    return <div className="text-red-500">{loginError}</div>;
  }

  return <Loading />;
}
