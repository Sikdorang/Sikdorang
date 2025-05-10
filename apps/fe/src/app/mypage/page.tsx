'use client';

import BaseButton from '@/components/common/buttons/BaseButton';
import TopNav from '@/components/layout/headers/TopNav';
import { KEYS } from '@/constants/storage';
import { AuthAPI } from '@/services/auth';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AuthAPI.logout();
      localStorage.removeItem(KEYS.ACCESS_TOKEN);
      document.cookie = `${KEYS.ACCESS_TOKEN}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      router.replace('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };
  return (
    <>
      <TopNav />
      <div className="wrapper mx-auto">
        <div className="max-w-80 mt-20 space-y-16">
          <div className="space-y-4">
            <h1 className="font-medium text-gray-900 mb-6">내 정보</h1>
            <div className="flex items-center">
              <div className="min-w-40 text-sm text-gray-700">아이디</div>
              <div className="px-2 py-1 bg-gray-100 border border-gray-200 rounded-sm text-sm text-gray-700 min-w-20 font-medium">
                qwer
              </div>
            </div>
            <div className="flex items-center">
              <div className="min-w-40 text-sm text-gray-700">비밀번호</div>
              <div className="px-2 py-1 bg-gray-100 border border-gray-200 rounded-sm text-sm text-gray-700 min-w-20 font-medium">
                qwer
              </div>
            </div>
            <div className="flex items-center">
              <div className="min-w-40 text-sm text-gray-700">관리자 전환 비밀번호</div>
              <div className="px-2 py-1 bg-gray-100 border border-gray-200 rounded-sm text-sm text-gray-700 min-w-20 font-medium">
                1234
              </div>
            </div>
          </div>

          <BaseButton onClick={handleLogout}>로그아웃</BaseButton>
        </div>
      </div>
    </>
  );
}
