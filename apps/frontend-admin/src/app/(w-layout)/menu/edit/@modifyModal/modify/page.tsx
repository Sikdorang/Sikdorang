'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { isEqual } from 'lodash';
import { useManageMenuDetails } from '@/hooks/useManageMenuDetails';
import { IMenuDetailsItem, IMenuImageItem } from '@/types/model/menu';
// import { MESSAGES } from '@/constants/messages';

import DetailsTextArea from '@/components/pages/menu/DetailsTextArea';
import BaseButton from '@/components/common/buttons/BaseButton';
import ImageGallery from '@/components/pages/menu/MenuImageGallery';
import Spinner from '@/components/common/loadings/Spinner';
import { useQueryClient } from '@tanstack/react-query';
import { invalidateQueries } from '@/utilities/invalidateQuery';
import { debounce } from 'lodash';
import { useCallback } from 'react';

export default function ManageMenuModal() {
  const queryClient = useQueryClient();
  const { menusDetails, isLoading, fetchMenusDetails, updateMenuDetails } = useManageMenuDetails();

  useEffect(() => {
    fetchMenusDetails(Number(queryId));
  }, []);

  useEffect(() => {
    if (menusDetails) {
      const mappedImages = (menusDetails.images || []).map((img) => ({
        ...img,
        image_url: img.image_url ?? img.url,
      }));
      setTemporaryMenuDetails({
        ...menusDetails,
        images: mappedImages,
      });
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

  // const [isComposing] = useState(false);
  // const [inputTagValue, setInputTagValue] = useState('');
  // const [, setTagError] = useState<string | null>(null);

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (isComposing) return;

  //   if (event.key === 'Enter' && inputTagValue.trim()) {
  //     event.preventDefault();

  //     const tags = temporaryMenuDetails.tags || [];
  //     if (tags.length >= 10) {
  //       setTagError(MESSAGES.maximumTagError);
  //       return;
  //     }
  //     if (!tags.some((t) => t.tag === inputTagValue.trim())) {
  //       setTemporaryMenuDetails((prev) => ({
  //         ...prev,
  //         tags: [...(prev.tags || []), { id: 0, tag: inputTagValue.trim() }],
  //       }));
  //       setInputTagValue('');
  //       setTagError('');
  //     }
  //   }
  // };

  // const handleDeleteTag = (tagToDelete: string) => {
  //   setTemporaryMenuDetails((prev) => ({
  //     ...prev,
  //     tags: prev.tags.filter((tag) => tag.tag !== tagToDelete),
  //   }));
  // };

  const handleConfirm = useCallback(async () => {
    if (!menusDetails) return;
    if (isEqual(menusDetails, temporaryMenuDetails)) {
      router.back();
      return;
    }

    try {
      await updateMenuDetails(Number(queryId), menusDetails, temporaryMenuDetails);
      invalidateQueries(queryClient);
      router.back();
    } catch (error) {
      console.log(error);
    }
  }, [menusDetails, temporaryMenuDetails, queryId, queryClient, router]);

  const debouncedHandleConfirm = useCallback(debounce(handleConfirm, 500), [handleConfirm]);

  return (
    <div
      className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 h-screen"
      onClick={() => router.back()}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]" onClick={(e) => e.stopPropagation()}>
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
                setImages={(updater: ((prev: IMenuImageItem[]) => IMenuImageItem[]) | IMenuImageItem[]) => {
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

              {/* <TextInput
                label="한 줄 설명"
                placeholder="메뉴의 대표 설명을 한 줄 입력해 주세요"
                value={temporaryMenuDetails.preview}
                onChange={(e) => setTemporaryMenuDetails((prev) => ({ ...prev, preview: e.target.value }))}
                maxLength={20}
              /> */}

              <DetailsTextArea
                label="상세 설명"
                rows={6}
                placeholder="메뉴 클릭 시 보일 상세 설명을 입력해 주세요"
                value={temporaryMenuDetails.details}
                onChange={(e) => setTemporaryMenuDetails((prev) => ({ ...prev, details: e.target.value }))}
                maxLength={200}
              />

              {/* <TextInput
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
                      <ProductTag key={tag.tag} variant="deletable" onDelete={() => handleDeleteTag(tag.tag)}>
                        {tag.tag}
                      </ProductTag>
                    ))}
                  </div>
                </div>
              )} */}
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-6">
          <BaseButton onClick={() => router.back()} variant="cancel" className="flex-1">
            취소
          </BaseButton>
          <BaseButton onClick={debouncedHandleConfirm} className="flex-4">
            확인
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
