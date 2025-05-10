import axios from 'axios';
import { useCallback, useState } from 'react';
import { MESSAGES } from '@/constants/messages';
import { toast } from 'react-toastify';
import { DetailsAPI, PatchMenuDetailsRequest } from '@/services/manageMenuDetails';
import { handelError } from '@/services/handleError';
import { IMenuDetailsItem, IMenuImageItem } from '@/types/model/menu';
import { isEqual } from 'lodash';

export const useManageMenuDetails = () => {
  const [menusDetails, setMenusDetails] = useState<IMenuDetailsItem>();
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMenusDetails = async (menuId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await DetailsAPI.getMenuDetails(menuId);
      setMenusDetails(response);
      console.log('여긴가? : ', response);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setError(MESSAGES.emailRequired);
      } else {
        handelError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImagesToS3 = useCallback(async (menuId: number, images: IMenuImageItem[]) => {
    try {
      const safeImages = images || [];
      const newImages = safeImages.filter((img) => !img.id || img.id === 0);
      const uploadedImages: IMenuImageItem[] = [];

      for (const img of newImages) {
        const file = img.file;
        if (!file || !img.image_url) continue;

        // 1. 확장자 추출
        const fileExtension = file.name.split('.').pop();
        const uuidFileName = `${img.image_url}.${fileExtension}`;

        // 2. Presigned URL 요청 (API 서비스 사용)
        const { url } = await DetailsAPI.getPresignedUrl(menuId, uuidFileName);

        // 3. S3 업로드 (API 서비스 사용)
        await DetailsAPI.uploadToS3(url, file);

        uploadedImages.push({
          ...img,
          image_url: uuidFileName,
        });
      }

      return uploadedImages;
    } catch (error) {
      handelError(error);
      throw error;
    }
  }, []);

  const updateMenuDetails = useCallback(
    async (menuId: number, original: IMenuDetailsItem, updated: IMenuDetailsItem) => {
      if (isEqual(original, updated)) return;

      setIsUploading(true);
      try {
        // 1. 새 이미지 업로드
        const uploadedImages = await uploadImagesToS3(menuId, updated.images);

        // 2. 업로드 결과 반영
        const mergedImages = (updated.images || []).map((existingImg) => {
          const uploaded = uploadedImages.find((u) => u.order === existingImg.order);
          return uploaded || existingImg;
        });

        // 3. 변경 데이터 생성
        const patchData: PatchMenuDetailsRequest = {
          preview: updated.preview,
          details: updated.details,
          tags: (updated.tags || []).map((t) => ({ id: t.id, tag: t.tag })),
          images: mergedImages.map((i) => ({
            id: i.id || 0,
            image_url: i.image_url,
            order: i.order,
          })),
        };

        console.log('patchData : ', patchData);

        // 4. 메뉴 정보 업데이트
        await DetailsAPI.updateMenuDetails(menuId, patchData);
        setMenusDetails((prev) => ({ ...prev, ...updated, images: mergedImages }));

        toast.success(MESSAGES.syncMenuDetailsSuccess);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setError(MESSAGES.emailRequired);
        } else {
          handelError(error);
        }
        throw error;
      } finally {
        setIsUploading(false);
      }
    },
    [uploadImagesToS3],
  );

  return { menusDetails, isLoading, error, fetchMenusDetails, updateMenuDetails };
};
