'use client';

import CtaButton from '../../../components/common/buttons/CtaButton';
import { default as CategoryButton } from '@/components/common/buttons/CtaButton';
import FeatureCard from '@/components/pages/recommend/FeatureCard';
import DeleteIcon from '@public/icons/ic_x.svg';
import LightRecommendImage from '@public/images/img_2_drinks.png';
import FullRecommendImage from '@public/images/img_4_drinks.png';
import RecommendScreen from '@public/images/img_recommend_screen.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RecommendPage() {
  const router = useRouter();

  const [showRecommendOptions, setShowRecommendOptions] = useState(false);
  const [showCategorySelection, setShowCategorySelection] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // 초기 화면
  if (!showCategorySelection && !showRecommendOptions) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="wrapper flex w-full flex-col items-center justify-center py-4 gap-8">
          <div className="flex w-full px-12 py-4 gap-16">
            <div className="w-1/4">
              <Image src={RecommendScreen} alt="recommend" />
            </div>
            <div className="w-3/4 flex flex-col gap-4 justify-center">
              <div className="text-dt-1 color-gray-900">
                우리 매장만의 술 추천을 시작해보세요
              </div>
              <div className="text-dsh-2 color-gray-700">
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
                    setShowCategorySelection(true);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 카테고리 선택 화면
  if (showCategorySelection && !showRecommendOptions) {
    const categories = [
      '사이드 맥주',
      '주류 맥주',
      '막걸리 맥주',
      '한옥식 맥주',
      '이상한 맥주',
      '이천의 맥주',
      '라떼쥬',
      '샤케',
      '막걸리',
    ];

    const handleCategoryToggle = (category: string) => {
      setSelectedCategories((prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev, category],
      );
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="wrapper flex w-full flex-col py-8 gap-8 max-w-2xl">
          <div className="text-left">
            <h1 className="text-dt-1 text-gray-900 mb-2">
              추천 술 카테고리 설정하기
            </h1>
            <p className="text-dsh-2 text-gray-600">
              정확한 추천을 위해, 술 카테고리를 직접 선택 해주세요
            </p>
          </div>

          <div className="w-full bg-gray-100 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center grow-1 gap-2">
                <div className="text-dsh-1 text-gray-800">추천 술 카테고리</div>
                <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">?</span>
                </div>
              </div>
              <CtaButton text="추가하기" width="fit" color="black" />
            </div>

            {/* 카테고리 태그들 */}
            <div className="flex flex-wrap gap-2 mb-6 min-h-[100px]">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <CategoryButton
                    text={category}
                    color="white"
                    size="small"
                    width="fit"
                    right={
                      <span className="text-mobile-body-s-semibold text-gray-200">
                        <Image src={DeleteIcon} alt="plus" />
                      </span>
                    }
                    onClick={() => handleCategoryToggle(category)}
                  />
                ))
              ) : (
                <div className="w-full flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="text-dh-1 text-gray-500 text-sm">
                      아직 카테고리 설정이 되지 않았어요
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {categories.length > 0 ? (
            <div className="w-full">
              <CtaButton
                size="large"
                text="다음으로"
                onClick={() => {
                  setShowRecommendOptions(true);
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold"
              />
            </div>
          ) : undefined}
        </div>
      </div>
    );
  }

  // 최종 옵션 선택 화면
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="wrapper flex w-full flex-col py-4 gap-8">
        <div className="text-left">
          <h1 className="text-dt-1 text-gray-900 mb-2">추천 모드 설정하기</h1>
          <p className="text-dsh-2 text-gray-500">
            나중에 바꿀수 없으니 신중하게 선택해주세요 !
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <FeatureCard
            image={<Image src={FullRecommendImage} alt={''} />}
            title="10개 세밀 분류"
            subTitle="주종이 많은 매장"
            description={`10개 유형으로 취향에 맞는 술을 정교하게 추천해요. 다양한 주종을 보유한 매장에 잘 어울려요.`}
            onClick={() => router.push('/recommend/full')}
          />

          <div className="flex gap-4 items-stretch h-full" />

          <FeatureCard
            image={<Image src={LightRecommendImage} alt={''} />}
            title="5개 대표 그룹"
            subTitle="주종이 적은 매장"
            description="5개 대표 유형으로 간편하고 쉬운 추천을 제공해요. 주종이 적은 매장에 적합해요."
            onClick={() => router.push('/recommend/light')}
          />
        </div>
      </div>
    </div>
  );
}
