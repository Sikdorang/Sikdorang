'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { isEqual } from 'lodash';

import TextInput from '@/components/common/inputs/TextInput';
import BaseButton from '@/components/common/buttons/BaseButton';
import ProductTag from '@/components/common/labels/ProductTag';
import ImageGallery from '@/components/pages/menu/MenuImageGallery';

import { MESSAGES } from '@/constants/messages';
import { useManageMenuDetails, IMenuDetails } from '@/hooks/useManageMenuDetails';

export default function ManageMenuModal() {
  const { menusDetails, isLoading, error, fetchMenusDetails } = useManageMenuDetails();

  useEffect(() => {
    fetchMenusDetails(Number(queryId));
  }, []);

  useEffect(() => {
    if (menusDetails) {
      setTemporaryMenuDetails(menusDetails);
    }
  }, [menusDetails]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const queryId = searchParams.get('id');

  const [temporaryMenuDetails, setTemporaryMenuDetails] = useState<IMenuDetails>({
    preview: '',
    details: '',
    tags: [],
    images: [],
  });

  const [isComposing, setIsComposing] = useState(false);
  const [inputTagValue, setInputTagValue] = useState('');
  const [tagError, setTagError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        router.back();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;

    if (event.key === 'Enter' && inputTagValue.trim()) {
      event.preventDefault();

      if (temporaryMenuDetails.tags.length >= 10) {
        setTagError(MESSAGES.maximumTagError);
        return;
      }
      if (!temporaryMenuDetails.tags.includes(inputTagValue.trim())) {
        setTemporaryMenuDetails((prev) => ({
          ...prev,
          tags: [...prev.tags, inputTagValue.trim()],
        }));
        setInputTagValue('');
        setTagError('');
      }
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTemporaryMenuDetails((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToDelete),
    }));
  };

  const handleConfirm = async () => {
    if (isEqual(menusDetails, temporaryMenuDetails)) {
      router.back();
      return;
    }
    try {
      // await updateMenuDetails(Number(queryId), temporaryMenuDetails);
      router.back();
    } catch (error) {
      console.error('메뉴 수정 실패:', error);
    }
  };
  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
        <div className="text-title-sm mb-4">이미지 및 설명 관리</div>

        <div className="space-y-4">
          <ImageGallery
            images={temporaryMenuDetails.images || []}
            setImages={(updater) => {
              setTemporaryMenuDetails((prev) => ({
                ...prev,
                images: typeof updater === 'function' ? updater(prev.images || []) : updater,
              }));
            }}
            maxImages={10}
          />

          <TextInput
            label="한 줄 설명"
            placeholder="메뉴의 대표 설명을 한 줄 입력해 주세요"
            value={temporaryMenuDetails.preview}
            onChange={(e) => setTemporaryMenuDetails((prev) => ({ ...prev, preview: e.target.value }))}
            maxLength={20}
          />

          <TextInput
            label="상세 설명"
            placeholder="메뉴 클릭 시 보일 상세 설명을 입력해 주세요"
            value={temporaryMenuDetails.details}
            onChange={(e) =>
              setTemporaryMenuDetails((prev) => ({
                ...prev,
                details: e.target.value,
              }))
            }
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
            errorMessage={tagError ?? undefined}
            maxLength={10}
          />
          {temporaryMenuDetails?.tags && (
            <div className="mt-4">
              <h2 className="text-label-xs-m text-gray-700">입력한 태그</h2>
              <div className="flex flex-wrap w-full gap-1 mt-2">
                {temporaryMenuDetails?.tags.map((tag) => (
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
