'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

import TextInput from '@/components/common/inputs/TextInput';
import BaseButton from '@/components/common/buttons/BaseButton';
import ProductTag from '@/components/common/labels/ProductTag';

import deleteIcon from '@public/icons/ic_x.svg';
import addIcon from '@public/icons/ic_plus.svg';

export default function MenuManageModal({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const MAX_IMAGES = 10;

  const [isComposing, setIsComposing] = useState(false);
  const [shortDescription, setShortDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [inputTagValue, setInputTagValue] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;

    if (event.key === 'Enter' && inputTagValue.trim()) {
      event.preventDefault();

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

  // 이미지 업로드 핸들러
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (images.length + files.length > MAX_IMAGES) {
      alert(`최대 ${MAX_IMAGES}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }

    const uploadedImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...uploadedImages]);

    // 첫 번째 이미지를 자동으로 선택
    if (!selectedImage && uploadedImages.length > 0) {
      setSelectedImage(uploadedImages[0]);
    }
  };

  // 이미지 삭제 핸들러
  const handleDeleteImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    // 선택된 이미지가 삭제된 경우 처리
    if (selectedImage === images[index]) {
      setSelectedImage(updatedImages[0] || null);
    }
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

        {/* 메인 이미지 미리보기 */}
        <div className="w-full h-64 border border-blue-200 rounded-md flex items-center justify-center mb-4">
          {selectedImage ? (
            <img src={selectedImage} alt="선택된 이미지" className="w-full h-full object-cover rounded-md" />
          ) : (
            <p className="text-gray-400 text-body-xs">이미지를 업로드해 주세요</p>
          )}
        </div>

        {/* 썸네일 목록 */}
        <div className="flex items-center space-x-2 overflow-x-auto mb-3">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`썸네일 ${index + 1}`}
                className={`w-16 h-16 object-cover rounded-md cursor-pointer ${
                  selectedImage === image ? 'border-2 border-blue-500' : 'border border-gray-200'
                }`}
                onClick={() => setSelectedImage(image)}
              />
              <button
                onClick={() => handleDeleteImage(index)}
                className="absolute top-0 right-0 bg-white text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
              >
                <Image src={deleteIcon} alt="" />
              </button>
            </div>
          ))}

          {/* 업로드 버튼 */}
          {images.length < MAX_IMAGES && (
            <label className="w-16 h-16 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer">
              <Image src={addIcon} alt="" className="w-4 h-4" />
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          )}
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
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            onChange={(e) => setInputTagValue(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={10}
          />
          {tags && (
            <div className="mt-4">
              <h2 className="text-label-xs-m text-gray-700">입력한 태그</h2>
              <div className="flex flex-wrap w-full gap-1 mt-2">
                {tags.map((tag) => (
                  <ProductTag key={tag} variant="deletable" onDelete={() => handleDeleteTag(tag)}>
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
