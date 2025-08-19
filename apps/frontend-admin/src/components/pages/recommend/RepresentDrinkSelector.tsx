'use client';

import CtaButton from '@/components/common/buttons/CtaButton';
import ThreeStepSlider from '@/components/pages/recommend/ThreeStepSlider';
import { useState } from 'react';

type SliderValue = 'left' | 'center' | 'right';

export default function RepresentDrinkSelector() {
  const [category, setCategory] = useState('단맛');
  const [sliderValue, setSliderValue] = useState<SliderValue>('center');
  const [dislikeOption, setDislikeOption] = useState('술 지정하기');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const categoryOptions = ['단맛', '신맛', '바디감', '도수'];
  const dislikeOptions = ['술 지정하기', '소주', '맥주', '와인', '막걸리'];

  const currentIndex = categoryOptions.indexOf(category);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < categoryOptions.length - 1;

  const goToPrevCategory = () => {
    if (canGoPrev) {
      setCategory(categoryOptions[currentIndex - 1]);
      setSliderValue('center');
    }
  };

  const goToNextCategory = () => {
    if (canGoNext) {
      setCategory(categoryOptions[currentIndex + 1]);
      setSliderValue('center');
    }
  };

  const headerText = {
    left: '완전 싫어요',
    center: '보통이에요',
    right: '완전 좋아요',
  }[sliderValue];

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* 메인 카드 */}
      <div className="bg-white rounded-2xl border border-gray-300 overflow-hidden">
        {/* 헤더 */}
        <div className="bg-gray-900 text-white text-lg font-medium px-6 py-4">
          대표 술 정하기
        </div>

        <div className="p-6 space-y-6">
          {/* 카테고리 선택 */}
          <div>
            <div
              className="flex items-center text-gray-800 font-medium mb-4 cursor-pointer"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              {category}
            </div>
          </div>

          <div>
            <ThreeStepSlider value={sliderValue} onChange={setSliderValue} />
          </div>

          <div className="flex justify-between pt-4">
            <CtaButton
              text="이전으로"
              color="gray"
              width="fit"
              size="small"
              radius="xl"
              disabled={!canGoPrev}
              onClick={goToPrevCategory}
            />
            <CtaButton
              text="다음으로"
              color="black"
              size="small"
              width="fit"
              radius="xl"
              disabled={!canGoNext}
              onClick={goToNextCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
