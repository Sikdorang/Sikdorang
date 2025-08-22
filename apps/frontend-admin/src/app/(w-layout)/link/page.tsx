'use client';

import CtaButton from '../../../components/common/buttons/CtaButton';
import TextInput from '../../../components/common/inputs/TextInput';
import QRLinkProfileImage from '@public/images/img_example_qr.png';
import LinkProfileImage from '@public/images/img_qr_book.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LinkPage() {
  const [showQRLinkMode, setShowQRLinkMode] = useState(false);
  const router = useRouter();

  if (showQRLinkMode) {
    return (
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <div className="wrapper flex w-full flex-col py-4 gap-8 justify-center">
          <div className="w-full px-6 flex flex-col justify-center items-center gap-4 mb-4">
            <div className="text-mh-1 text-gray-800 text-center">
              종이 위쪽에 있는 <br /> 8자리 번호를 입력해주세요
            </div>
            <div className="w-sm">
              <TextInput
                placeholder="고유번호 8자리를 입력해주세요"
                limitHide
              />
            </div>
          </div>
          <div className="flex gap-4 justify-center px-6 mb-2">
            <Image src={QRLinkProfileImage} alt={''} width={485} height={367} />
          </div>
        </div>
        <div className="flex gap-4">
          <CtaButton color="white" width="fit" text="뒤로" />{' '}
          <CtaButton
            width="fit"
            text="다음으로"
            onClick={() => router.push('/link/setting')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center border-t border-gray-100 h-[90vh]">
      <div className="wrapper flex w-full flex-col items-center justify-center py-4 gap-8">
        <Image src={LinkProfileImage} width={276} height={269} alt="" />
        <div className="text-dh-1 color-gray-900">QR 스티커를 받으셨나요 ?</div>
        <div className="text-dsh-2 color-gray-600">
          식도랑 주문 시스템은 테이블별 QR 스티커와 연동됩니다.
          <br />
          아직 스티커를 못 받으셨다면, 관리자에게 요청해주세요.
        </div>
        <div>
          <CtaButton
            size="medium"
            width="fit"
            text="QR 스티커 등록하기"
            onClick={() => setShowQRLinkMode(true)}
          />
        </div>
      </div>
    </div>
  );
}
