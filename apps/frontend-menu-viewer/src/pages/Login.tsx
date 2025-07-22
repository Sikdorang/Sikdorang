import LogoImage from '@/assets/images/img_logo.svg?react';
import BaseResponsiveLayout from '@/components/common/BaseResponsiveLayout';
import PinInput from '@/components/pages/login/PinInput';

export default function Login() {
  return (
    <BaseResponsiveLayout>
      <div className="flex h-full w-full flex-col">
        <div className="flex flex-col items-center py-40">
          <div className="mb-14 flex gap-3 items-end">
            <LogoImage />
            <div className="text-mh-1 text-gray-400">손님용 메뉴판 로그인</div>
          </div>
          <p className="mb-5 text-mh-1 text-center text-gray-900">
            PIN 번호
            <br />
            5자리를 입력해주세요
          </p>
          <PinInput />
        </div>
      </div>
    </BaseResponsiveLayout>
  );
}
