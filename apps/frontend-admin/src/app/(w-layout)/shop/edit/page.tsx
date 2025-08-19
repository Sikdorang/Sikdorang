'use client';

import CtaButton from '@/components/common/buttons/CtaButton';
import TextInput from '@/components/common/inputs/TextInput';
import BusinessHours from '@/components/pages/shop/BusinessHours';
import Corkage from '@/components/pages/shop/Corkage';
import { useManageStoreInfo } from '@/hooks/useManageStoreInfo';
import { UpdateStoreRequest } from '@/types/model/payload';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function EditShopPage() {
  const {
    storeInfos,
    setStoreInfos,
    isStoreInfosLoading,
    fetchStoreInfos,
    updateStoreInfos,
  } = useManageStoreInfo();

  const [wifiId, setWifiId] = useState('');
  const [wifiPw, setWifiPw] = useState('');
  const [original, setOriginal] = useState<any>(null);

  useEffect(() => {
    fetchStoreInfos();
  }, [fetchStoreInfos, original]);

  useEffect(() => {
    if (storeInfos && !original) {
      setOriginal(JSON.parse(JSON.stringify(storeInfos)));
    }
  }, [storeInfos, original]);

  const changedFields = useMemo(() => {
    if (!storeInfos || !original) return [];

    const changes: Array<{ key: string; newValue: any }> = [];

    if (storeInfos.name !== original.name) {
      changes.push({ key: 'store', newValue: storeInfos.name });
    }

    (storeInfos.infoItems || []).forEach((curr) => {
      const origItem = original.infoItems.find((o: any) => o.key === curr.key);
      const currVal = curr.value || '';
      const origVal = origItem?.value || '';
      if (currVal !== origVal) {
        changes.push({ key: curr.key, newValue: currVal });
      }
    });

    return changes;
  }, [storeInfos, original]);

  const shouldShowSaveButton = changedFields.length > 0;

  const getInfoValue = (key: string) =>
    (storeInfos?.infoItems || []).find((i) => i.key === key)?.value || '';

  const updateInfoItem = (key: string, value: string) => {
    if (!storeInfos) return;
    const updated = storeInfos.infoItems.map((item) =>
      item.key === key ? { ...item, value } : item,
    );
    setStoreInfos({ ...storeInfos, infoItems: updated });
  };

  useEffect(() => {
    const wifiValue = getInfoValue('wifi');
    if (wifiValue.includes(' / ')) {
      const [id, pw] = wifiValue.split(' / ');
      setWifiId(id.replace('ID ', ''));
      setWifiPw(pw.replace('PW ', ''));
    }
  }, [storeInfos]);

  const handleWifiIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWifiId(e.target.value);
    updateInfoItem('wifi', `ID ${e.target.value} / PW ${wifiPw}`);
  };

  const handleWifiPwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWifiPw(e.target.value);
    updateInfoItem('wifi', `ID ${wifiId} / PW ${e.target.value}`);
  };

  const handleSave = useCallback(async () => {
    if (!shouldShowSaveButton) return;

    const body: Partial<UpdateStoreRequest> = {};
    changedFields.forEach(({ key, newValue }) => {
      if (key === 'store') {
        body.store = newValue;
      } else if (key === 'wifi') {
        if (typeof newValue === 'string' && newValue.includes(' / ')) {
          const [id, pw] = newValue.split(' / ');
          body.wifiId = id.replace('ID ', '').trim();
          body.wifiPassword = pw.replace('PW ', '').trim();
        }
      } else if (key === 'corkage') {
        body.corkagePossible = newValue.includes('가능');
        body.corkageFee = !newValue.includes('유료');
      } else if (key === 'phoneNumber') {
        body.phoneNumber = newValue;
      } else if (key === 'naverPlace') {
        body.naverPlace = newValue;
      } else if (key === 'toilet') {
        body.toilet = newValue;
      } else if (key === 'openHour') {
        body.time = [
          {
            /* parse as needed from newValue */
          },
        ];
      }
    });

    await updateStoreInfos(body);
    setOriginal(JSON.parse(JSON.stringify(storeInfos)));
  }, [changedFields, shouldShowSaveButton, updateStoreInfos, storeInfos]);

  return (
    <div className="relative flex flex-col items-center justify-center border border-gray-100">
      <div className="wrapper flex w-full flex-col items-center justify-center py-4 gap-4">
        <TextInput
          label="전화번호"
          placeholder="'-' 없이 숫자만"
          value={getInfoValue('phoneNumber')}
          onChange={(e) => updateInfoItem('phoneNumber', e.target.value)}
          isLoading={isStoreInfosLoading}
          maxLength={11}
          limitHide={true}
        />

        <BusinessHours
          label="영업 시간"
          value={getInfoValue('openHour')}
          onChange={(v) => updateInfoItem('openHour', v)}
        />

        <Corkage
          label="콜키지"
          value={getInfoValue('corkage')}
          onChange={(v) => updateInfoItem('corkage', v)}
        />

        <TextInput
          label="네이버 플레이스"
          placeholder="링크"
          value={getInfoValue('naverPlace')}
          onChange={(e) => updateInfoItem('naverPlace', e.target.value)}
          isLoading={isStoreInfosLoading}
          limitHide={true}
        />

        <div className="flex flex-col w-full gap-2">
          <TextInput
            label="WiFi"
            placeholder="아이디"
            value={wifiId}
            onChange={handleWifiIdChange}
            isLoading={isStoreInfosLoading}
            limitHide={true}
          />
          <TextInput
            placeholder="비밀번호"
            value={wifiPw}
            onChange={handleWifiPwChange}
            isLoading={isStoreInfosLoading}
            limitHide={true}
          />
        </div>

        <TextInput
          label="화장실 가는 길"
          placeholder="설명"
          value={getInfoValue('toilet')}
          onChange={(e) => updateInfoItem('toilet', e.target.value)}
          isLoading={isStoreInfosLoading}
        />
      </div>

      <div
        className={`fixed bottom-6 right-6 z-50 transition-opacity duration-300 ${
          shouldShowSaveButton
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <CtaButton
          text="변경사항 저장하기"
          size="medium"
          onClick={handleSave}
          isLoading={isStoreInfosLoading}
        />
      </div>
    </div>
  );
}
