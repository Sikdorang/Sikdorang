'use client';

import PolicyModal from '../../components/pages/login/PolicyModal';
import CtaButton from '@/components/common/buttons/CtaButton';
import {
  PRIVACY_POLICY_AGREEMENT,
  TERMS_OF_SERVICE,
} from '@/constants/messages';
import { useState } from 'react';

export default function Home() {
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    const KAKAO_LOGIN_URL = process.env.NEXT_PUBLIC_KAKAO_LOGIN_URL!;
    window.location.href = KAKAO_LOGIN_URL;
  };

  const openModal = (title: any, content: any) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
    setModalTitle('');
  };

  return (
    <div className="bg-w flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center text-center">
        <div className="mb-8">
          <h1 className="text-dh-1 text-bk mb-4">환영합니다!</h1>
          <p className="text-mb-1 text-gray-600">
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
          radius="xl"
          onClick={handleClick}
        />

        <div className="text-mb-3 mt-5 flex select-none items-center justify-center gap-4 text-gray-300">
          <span
            className="underline underline-offset-2"
            onClick={() => openModal('이용약관', TERMS_OF_SERVICE)}
          >
            이용약관
          </span>
          <span className="mx-1">|</span>
          <span
            className="underline underline-offset-2"
            onClick={() =>
              openModal('개인정보 보호정책', PRIVACY_POLICY_AGREEMENT)
            }
          >
            개인정보 보호정책
          </span>
        </div>
      </div>

      {isModalOpen && (
        <PolicyModal
          title={modalTitle}
          content={modalContent}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
