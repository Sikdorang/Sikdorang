'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { isEqual } from 'lodash';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useManageMenuDetails } from '@/hooks/useManageMenuDetails';
import { IMenuDetailsItem } from '@/types/model/menu';
import { MESSAGES } from '@/constants/messages';

import TextInput from '@/components/common/inputs/TextInput';
import BaseButton from '@/components/common/buttons/BaseButton';
import ProductTag from '@/components/common/labels/ProductTag';
import ImageGallery from '@/components/pages/menu/MenuImageGallery';
import Spinner from '@/components/common/loadings/Spinner';

export default function ManageMenuModal() {
  const { menusDetails, isLoading, fetchMenusDetails } = useManageMenuDetails();

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

  const [temporaryMenuDetails, setTemporaryMenuDetails] = useState<IMenuDetailsItem>({
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

      const tags = temporaryMenuDetails.tags || [];
      if (tags.length >= 10) {
        setTagError(MESSAGES.maximumTagError);
        return;
      }
      if (!tags.includes(inputTagValue.trim())) {
        setTemporaryMenuDetails((prev) => ({
          ...prev,
          tags: [...(prev.tags || []), inputTagValue.trim()],
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
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
        <div className="text-title-sm mb-4">이미지 및 설명 관리</div>

        {isLoading ? (
          <div className="flex justify-center items-center h-[70vh]">
            <Spinner className="border-blue-500 w-10 h-10" />
          </div>
        ) : (
          <div className="overflow-y-auto scroll-hide::-webkit-scrollbar scroll-hide">
            <div className="space-y-4 max-h-[70vh] p-1">
              <ImageGallery
                images={temporaryMenuDetails.images || []}
                setImages={(updater: ((prev: string[]) => string[]) | string[]) => {
                  setTemporaryMenuDetails((prev) => ({
                    ...prev,
                    images:
                      typeof updater === 'function'
                        ? updater(prev.images || [])
                        : Array.isArray(updater)
                          ? updater
                          : prev.images || [],
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">상세 설명</label>
                <MDEditor
                  value={temporaryMenuDetails.details}
                  onChange={(value) =>
                    setTemporaryMenuDetails((prev) => ({
                      ...prev,
                      details: value || '',
                    }))
                  }
                  commands={[commands.bold, commands.italic, commands.title, commands.hr, commands.strikethrough]}
                  height={200}
                  textareaProps={{
                    placeholder: '메뉴 클릭 시 보일 상세 설명을 입력해 주세요',
                    maxLength: 150,
                  }}
                />
              </div>

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
          </div>
        )}

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
