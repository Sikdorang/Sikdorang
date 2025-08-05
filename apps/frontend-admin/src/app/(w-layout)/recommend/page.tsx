'use client';

import CtaButton from '../../../components/common/buttons/CtaButton';
import FeatureCard from '@/components/pages/recommend/FeatureCard';
import RecommendScreen from '@public/images/img_recommend_screen.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RecommendPage() {
  const router = useRouter();

  const [showRecommendOptions, setShowRecommendOptions] = useState(false);

  if (!showRecommendOptions) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="wrapper flex w-full flex-col items-center justify-center py-4 gap-8">
          <div className="flex w-full px-12 py-4 gap-16">
            <div className="w-1/4">
              <Image src={RecommendScreen} alt="recommend" />
            </div>
            <div className="w-3/4 flex flex-col gap-4 justify-center">
              <div className="text-desktop-title-xl-semibold color-gray-900">
                우리 매장만의 술 추천을 시작해보세요
              </div>
              <div className="color-gray-700">
                재밌는 설문으로, 매장 술을 자연스럽게 소개할 수 있어요.
                <br />
                30초면 충분해요! 특별한 추천 경험을 선물해보세요.
              </div>
              <div>
                <CtaButton
                  size="medium"
                  width="fit"
                  text="술 추천 사용하기"
                  onClick={() => {
                    setShowRecommendOptions(true);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="wrapper flex w-full flex-col items-center justify-center py-4 gap-16">
        <div className="color-gray-700 text-desktop-title-xl-semibold">
          추천 결과를 몇 가지 스타일로 구성할까요?
        </div>
        <div className="flex gap-4">
          <FeatureCard
            title="10개 세밀 분류"
            description="취향을 세분화해 더 정밀하게 추천할 수 있어요."
            onClick={() => router.push('/recommend/full')}
          />

          <div className="flex gap-4 items-stretch h-full" />

          <FeatureCard
            title="5개 대표 그룹"
            description="이해하기 쉽고 간단한 추천 퀴즈를 원하거나, 주종이 적은 매장에 잘 어울립니다."
            onClick={() => router.push('/recommend/light')}
          />
        </div>
      </div>
    </div>
  );
}
