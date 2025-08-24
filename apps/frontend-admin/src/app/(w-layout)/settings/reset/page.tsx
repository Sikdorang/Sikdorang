'use client';

import CtaButton from '@/components/common/buttons/CtaButton';
import ConfirmModal from '@/components/common/modals/ConfirmModal';
import FeatureCard from '@/components/pages/recommend/FeatureCard';
import LightRecommendImage from '@public/images/img_2_drinks.png';
import FullRecommendImage from '@public/images/img_4_drinks.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SettingResetPage() {
  const router = useRouter();

  const [selectedGroup, setSelectedGroup] = useState<'full' | 'light' | null>(
    'full',
  );
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showResetComplete, setShowResetComplete] = useState<boolean>(false);

  if (showResetComplete) {
    return (
      <div className="flex flex-col items-center justify-center border-t border-gray-100 h-[90vh]">
        <div className="wrapper flex w-full flex-col items-center justify-center py-4 gap-8">
          <div className="flex flex-col gap-4 justify-center text-center">
            <div className="text-dt-3 text-gray-900">
              초기화가 완료되었습니다.
            </div>
            <div className="text-dsh-2 text-gray-700 mb-2">
              추천 모드가 초기화되었습니다.
              <br />
              다시 세팅을 시작해주세요.
            </div>
            <div>
              <CtaButton
                size="medium"
                color="gray"
                radius="xl"
                text="추천 관리 돌아가기"
                onClick={() => {
                  router.push('/recommend');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="wrapper flex w-full flex-col py-4 gap-8 justify-center">
        <div className="text-left px-6">
          <h1 className="text-dt-1 text-gray-900 mb-2">
            현재 선택하신 모드는 ‘정밀 추천 모드’입니다.
          </h1>
          <p className="text-dsh-2 text-gray-500">
            추천 기록과 설정을 초기화하면 기존 기록은 모두 삭제됩니다.
            <br />
            초기화 후에는 다시 질문/설정 과정을 진행해야 합니다.
          </p>
        </div>
        <div className="flex gap-4 justify-center px-6 mb-15">
          <div
            className={`transform transition-all duration-300 rounded-2xl ${
              selectedGroup === 'full'
                ? 'scale-105 opacity-100 shadow-lg'
                : selectedGroup === null
                  ? 'scale-100 opacity-100'
                  : 'scale-90 opacity-50'
            }`}
          >
            <FeatureCard
              image={<Image src={FullRecommendImage} alt={''} />}
              title="10개 세밀 분류"
              subTitle=""
              description=""
            />
          </div>

          <div className="flex gap-4 items-stretch h-full" />

          <div
            className={`transform transition-all duration-300 rounded-2xl ${
              selectedGroup === 'light'
                ? 'scale-105 opacity-100 shadow-lg'
                : selectedGroup === null
                  ? 'scale-100 opacity-100'
                  : 'scale-90 opacity-50'
            }`}
          >
            <FeatureCard
              image={<Image src={LightRecommendImage} alt={''} />}
              title="5개 대표 그룹"
              subTitle=""
              description=""
            />
          </div>
        </div>

        <CtaButton
          color="red"
          text="초기화하기"
          onClick={() => setShowConfirmModal(true)}
        />
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        title="정말 초기화하시겠습니까?"
        message={
          <div className="text-mb-2">
            이 작업은 되돌릴 수 없습니다. 초기화 시 기존 추천 기록은 삭제되며,
            다시 질문/설정 과정을 진행해야 합니다.
          </div>
        }
        onConfirm={() => setShowResetComplete(true)}
        onCancel={() => setShowConfirmModal(false)}
      />
    </div>
  );
}
