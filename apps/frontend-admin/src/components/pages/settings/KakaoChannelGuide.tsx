'use client';

import KakaoIcon from '@public/icons/ic_kakao_icon.png';
import PlusIcon from '@public/icons/ic_plus.svg';
import XIcon from '@public/icons/ic_x.svg';
import KakaoQR from '@public/images/img_kakao_qr.png';
import Image from 'next/image';
import { useEffect } from 'react';

interface KakaoChannelGuideModalProps {
  channelName: string;
  isOpen: boolean;
  onClose: () => void;
  onPlusClick?: () => void;
}

export default function KakaoChannelGuideModal({
  channelName,
  isOpen,
  onClose,
  onPlusClick,
}: KakaoChannelGuideModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-yellow-400 rounded-2xl p-6 max-w-4xl w-full mx-auto relative max-h-[90vh] overflow-auto">
        <button onClick={onClose} className="absolute top-6 right-5 p-2">
          <Image src={XIcon} className="h-4 w-4 text-white" alt={''} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-mh-1">카카오톡 채널 추가 가이드</h2>
        </div>

        <div className="flex items-center bg-white rounded-lg px-4 py-3 mb-6">
          <input
            type="text"
            readOnly
            value={channelName}
            className="flex-1 text-lg font-medium outline-none cursor-default"
          />
          <button
            onClick={onPlusClick}
            className="ml-3 p-2 rounded-full bg-gray-600 hover:bg-gray-700"
          >
            <Image src={PlusIcon} className="h-6 w-6 text-gray-700" alt={''} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
              <Image
                src={KakaoIcon}
                alt="카카오톡 실행하기"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <div className="text-center text-mb-1">카카오톡 실행하기</div>
          </div>

          <span className="hidden lg:block mx-3 text-2xl font-light">→</span>

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
              <Image
                src={KakaoIcon}
                alt="검색창에 채널명 입력하기"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <div className="text-center text-mb-1">
              검색창에 채널명 입력하기
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-dh-2">or</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
              <Image
                src={KakaoQR}
                alt="QR 스캔"
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <div className="text-center text-mb-1">QR 스캔</div>
          </div>

          <span className="hidden lg:block mx-3 text-2xl font-light">→</span>
          <span className="lg:hidden my-2 text-2xl font-light">↓</span>

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
              <Image
                src={KakaoIcon}
                alt="채널 추가하기"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <div className="text-center text-mb-1">채널 추가하기</div>
          </div>
        </div>
      </div>
    </div>
  );
}
