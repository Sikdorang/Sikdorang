'use client';

import CtaButton from '@/components/common/buttons/CtaButton';
import TextInput from '@/components/common/inputs/TextInput';
import Spinner from '@/components/common/loading/Spinner';
import ShopGuide from '@/components/pages/shop/ShopGuide';
import { useManageStoreInfo } from '@/hooks/useManageStoreInfo';
import { UpdateStoreNameRequest } from '@/types/model/payload';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function ShopPage() {
  const router = useRouter();
  const {
    storeInfos,
    setStoreInfos,
    isStoreInfosLoading,
    fetchStoreInfos,
    updateStoreInfos,
  } = useManageStoreInfo();

  const [originalName, setOriginalName] = useState<string>('');

  useEffect(() => {
    fetchStoreInfos();
  }, []);

  useEffect(() => {
    if (storeInfos?.name && originalName === '') {
      setOriginalName(storeInfos.name);
    }
  }, [storeInfos?.name, originalName]);

  const handleSave = useCallback(async () => {
    if (!storeInfos?.name || storeInfos.name === originalName) {
      return;
    }
    const requestData: UpdateStoreNameRequest = {
      store: storeInfos.name,
    };
    await updateStoreInfos(requestData);
    setOriginalName(storeInfos.name);
    fetchStoreInfos();
  }, [storeInfos?.name, originalName, updateStoreInfos]);

  const shouldShowSaveButton = useMemo(() => {
    return !!(storeInfos?.name && storeInfos.name !== originalName);
  }, [storeInfos?.name, originalName]);

  return (
    <div className="flex flex-col items-center justify-center border border-gray-100">
      <div className="wrapper flex w-full flex-col items-center justify-center py-4 gap-4">
        <TextInput
          isLoading={isStoreInfosLoading}
          label="매장명"
          placeholder="매장명을 입력해주세요."
          value={storeInfos?.name ?? ''}
          onChange={(e) => {
            setStoreInfos((prev) =>
              prev
                ? { ...prev, name: e.target.value }
                : { id: 0, name: e.target.value, infoItems: [] },
            );
          }}
          maxLength={20}
          onClear={() =>
            setStoreInfos((prev) =>
              prev ? { ...prev, name: '' } : { id: 0, name: '', infoItems: [] },
            )
          }
          isRequired={true}
        />
        {storeInfos ? (
          <ShopGuide
            label="매장 이용 가이드"
            onEditClick={() => {
              router.push('/shop/edit');
            }}
            infoItems={storeInfos.infoItems}
          />
        ) : (
          <div className="flex w-full items-center justify-center h-100">
            <Spinner />
          </div>
        )}
      </div>

      <div
        className={`fixed bottom-6 right-6 z-50 transition-opacity duration-300 ${
          shouldShowSaveButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <CtaButton
          text={'변경사항 저장하기'}
          size="medium"
          onClick={handleSave}
          isLoading={false}
        />
      </div>
    </div>
  );
}
