'use client';

import { useRouter } from 'next/navigation';

export default function ManageMenuModal() {
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 z-50 flex h-screen items-center justify-center backdrop-blur-md"
      onClick={() => router.back()}
    >
      <div
        className="w-[600px] rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-title-sm mb-4">이미지 및 설명 관리</div>

        <div className="scroll-hide::-webkit-scrollbar scroll-hide overflow-y-auto">
          <div className="max-h-[70vh] space-y-4 p-1">
            {/* <ImageGallery
              images={temporaryMenuDetails.images || []}
              setImages={(
                updater:
                  | ((prev: IMenuImageItem[]) => IMenuImageItem[])
                  | IMenuImageItem[],
              ) => {
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
            /> */}

            {/* <TextInput
                label="한 줄 설명"
                placeholder="메뉴의 대표 설명을 한 줄 입력해 주세요"
                value={temporaryMenuDetails.preview}
                onChange={(e) => setTemporaryMenuDetails((prev) => ({ ...prev, preview: e.target.value }))}
                maxLength={20}
              /> */}

            {/* <DetailsTextArea
              label="상세 설명"
              rows={6}
              placeholder="메뉴 클릭 시 보일 상세 설명을 입력해 주세요"
              value={temporaryMenuDetails.details}
              onChange={(e) =>
                setTemporaryMenuDetails((prev) => ({
                  ...prev,
                  details: e.target.value,
                }))
              }
              maxLength={200}
            /> */}

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
        {/* 
        <div className="mt-6 flex gap-2">
          <BaseButton
            onClick={() => router.back()}
            variant="cancel"
            className="flex-1"
          >
            취소
          </BaseButton>
          <BaseButton onClick={debouncedHandleConfirm} className="flex-4">
            확인
          </BaseButton>
        </div> */}
      </div>
    </div>
  );
}
