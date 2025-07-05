'use client';

import CtaButton from '@/components/common/buttons/CtaButton';
import { useRouter } from 'next/navigation';
export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/menu/edit');
  };

  return (
    <div className="bg-w flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center text-center">
        <div className="mb-8">
          <h1 className="text-desktop-title-xl-semibold text-bk mb-4">
            환영합니다!
          </h1>
          <p className="text-mobile-body-l-semibold leading-relaxed text-gray-600">
            이제부터 식도랑과 함께
            <br />
            편하게 메뉴판 관리를 시작해요.
          </p>
        </div>

        <div className="mb-12">
          <div className="h-128 w-128 mx-auto flex items-center justify-center rounded-2xl bg-gray-100"></div>
        </div>

        <CtaButton
          text="카카오로 시작하기"
          size="large"
          onClick={handleClick}
        />

        <div className="text-mobile-body-s-semibold mt-5 flex select-none items-center justify-center gap-4 text-gray-300">
          <span className="underline underline-offset-2">이용약관</span>
          <span className="mx-1">|</span>
          <span className="underline underline-offset-2">
            개인정보 보호정책
          </span>
        </div>
      </div>
    </div>
  );
}
