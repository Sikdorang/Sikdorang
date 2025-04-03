'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import TextInput from '@/components/common/inputs/TextInput';
import BaseButton from '@/components/common/buttons/BaseButton';
import ProductTag from '@/components/common/labels/ProductTag';

export default function MenuManageModal({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [images, setImages] = useState<string[]>([]);
  const MAX_IMAGES = 10;

  const [shortDescription, setShortDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [inputTagValue, setInputTagValue] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputTagValue.trim()) {
      event.preventDefault(); // 기본 동작 방지
      if (tags.length >= 10) {
        alert('태그는 최대 10개까지 입력할 수 있습니다.');
        return;
      }
      if (!tags.includes(inputTagValue.trim())) {
        setTags((prevTags) => [...prevTags, inputTagValue.trim()]); // 태그 추가
        setInputTagValue(''); // 입력 필드 초기화
      }
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete)); // 태그 삭제
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (images.length + files.length > MAX_IMAGES) {
      alert(`최대 ${MAX_IMAGES}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }
    const uploadedImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...uploadedImages]);
  };

  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleConfirm = () => {
    console.log('Selected ID:', params.id);
    console.log('Modal Data:', { images, shortDescription, detailedDescription });
    router.back();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
        <div className="text-title-sm mb-4">이미지 및 설명 관리</div>

        <div className="mb-4 flex items-center space-x-4">
          <label className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer">
            이미지 업로드
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
          <p className="text-sm text-gray-500">
            {images.length}/{MAX_IMAGES} 이미지
          </p>
        </div>

        <div className="mb-4">
          <Swiper
            style={{ '--swiper-navigation-color': '#fff' } as React.CSSProperties}
            loop
            spaceBetween={10}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="relative">
                <img src={image} alt={`Upload ${index}`} className="w-full h-[200px] object-cover rounded" />
                <button
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
                >
                  삭제
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop
            spaceBetween={10}
            slidesPerView={4}
            freeMode
            watchSlidesProgress
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper mt-2"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={`Thumb ${index}`} className="w-full h-[100px] object-cover rounded" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="space-y-4">
          <TextInput
            label="한 줄 설명"
            placeholder="메뉴의 대표 설명을 한 줄 입력해 주세요"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            maxLength={20}
          />

          <TextInput
            label="상세 설명"
            placeholder="메뉴 클릭 시 보일 상세 설명을 입력해 주세요"
            value={detailedDescription}
            onChange={(e) => setDetailedDescription(e.target.value)}
            maxLength={150}
          />

          <TextInput
            label="태그"
            placeholder="태그를 입력해 주세요"
            value={inputTagValue}
            onChange={(e) => setInputTagValue(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={10}
          />
          {tags && (
            <div className="mt-4">
              <h2 className="text-label-xs-m text-gray-700">입력한 태그</h2>
              <div className="flex flex-wrap w-full gap-1 mt-2">
                {tags.map((tag) => (
                  <ProductTag variant="deletable" onDelete={() => handleDeleteTag(tag)}>
                    {tag}
                  </ProductTag>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-6">
          <BaseButton onClick={() => router.back()} variant="cancel" className="flex-1">
            취소
          </BaseButton>
          <BaseButton onClick={handleConfirm} className="flex-4">
            확인
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
