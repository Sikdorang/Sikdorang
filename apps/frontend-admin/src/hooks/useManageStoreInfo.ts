import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/messages';
import { handelError } from '@/services/handleErrors';
import { StoreInfoAPI } from '@/services/store';
import { UpdateStoreRequest } from '@/types/model/payload';
import { IStoreInfo } from '@/types/model/store';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

export const useManageStoreInfo = () => {
  const [storeInfos, setStoreInfos] = useState<IStoreInfo>();
  const [isStoreInfosLoading, setIsStoreInfosLoading] = useState(true);
  const [storeError, setStoreError] = useState<string | null>(null);

  const fetchStoreInfos = useCallback(async () => {
    setIsStoreInfosLoading(true);
    setStoreError(null);
    try {
      const response = await StoreInfoAPI.getStoreInfos();
      console.log('API 응답:', response);
      setStoreInfos(response);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setStoreError(ERROR_MESSAGES.authenticationError);
      } else {
        handelError(error);
      }
    } finally {
      setIsStoreInfosLoading(false);
    }
  }, [setIsStoreInfosLoading, setStoreError, setStoreInfos, handelError]);

  const updateStoreInfos = useCallback(
    async (storeData: Partial<UpdateStoreRequest>) => {
      setIsStoreInfosLoading(true);
      setStoreError(null);

      try {
        const response = await StoreInfoAPI.updateStoreInfos(storeData);
        setStoreInfos(response);
        toast.success(SUCCESS_MESSAGES.updateStoreInfoSuccess);

        return { success: true, data: response };
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setStoreError(ERROR_MESSAGES.authenticationError);
        } else {
          handelError(error);
        }
        return { success: false, error };
      } finally {
        setIsStoreInfosLoading(false);
      }
    },
    [setStoreError, setStoreInfos, handelError],
  );

  const convertStoreInfoToRequest = useCallback(() => {
    if (!storeInfos) return null;

    const getInfoValue = (key: string) => {
      return (
        storeInfos.infoItems?.find((item) => item.key === key)?.value || ''
      );
    };

    const wifiValue = getInfoValue('wifi');
    let wifiId = '';
    let wifiPassword = '';

    if (wifiValue && wifiValue.includes(' / ')) {
      const [id, pw] = wifiValue.split(' / ');
      wifiId = id.replace('ID ', '').trim();
      wifiPassword = pw.replace('PW ', '').trim();
    }

    const corkageValue = getInfoValue('corkage');
    const corkagePossible = corkageValue.includes('가능');
    const corkageFee = corkageValue.includes('유료');

    const requestData: UpdateStoreRequest = {
      store: storeInfos.name || '',
      wifiId,
      wifiPassword,
      phoneNumber: getInfoValue('phoneNumber'),
      naverPlace: getInfoValue('naverPlace'),
      corkagePossible,
      corkageFee,
      toilet: getInfoValue('toilet'),
      time: [],
    };

    return requestData;
  }, [storeInfos]);

  const saveCurrentStoreInfo = useCallback(async () => {
    const requestData = convertStoreInfoToRequest();
    if (!requestData) {
      console.error('저장할 매장 정보가 없습니다.');
      return { success: false, error: '저장할 데이터가 없습니다.' };
    }

    return await updateStoreInfos(requestData);
  }, [convertStoreInfoToRequest, updateStoreInfos]);

  return {
    storeInfos,
    setStoreInfos,
    isStoreInfosLoading,
    fetchStoreInfos,
    updateStoreInfos,
    convertStoreInfoToRequest,
  };
};
