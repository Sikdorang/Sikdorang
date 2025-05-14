import axios from 'axios';
import { useCallback, useState } from 'react';
import { MESSAGES } from '@/constants/messages';
import { toast } from 'react-toastify';
import { DetailsAPI, PatchMenuDetailsRequest } from '@/services/manageMenuDetails';
import { handelError } from '@/services/handleError';
import { IMenuDetailsItem, IMenuImageItem } from '@/types/model/menu';
import { isEqual } from 'lodash';
import imageCompression from 'browser-image-compression';

export const useManageMenuDetails = () => {
  const [menusDetails, setMenusDetails] = useState<IMenuDetailsItem>();
  const [isLoading, setIsLoading] = useState(true);
  const [, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMenusDetails = async (menuId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await DetailsAPI.getMenuDetails(menuId);
      console.log('fetchMenusDetails: ', response);
      setMenusDetails(response);
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

        // 1. 이미지 압축
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 2, // 최대 용량
          maxWidthOrHeight: 1920, // 최대 해상도
          useWebWorker: true, // 웹 워커 사용
          fileType: 'image/webp', // WebP 포맷
          initialQuality: 0.75, // 품질 75%
        });

        // 2. 파일명 변경 (확장자 → .webp)
        const uuidFileName = `${img.image_url}.webp`;

        // 3. Presigned URL 요청
        const { url } = await DetailsAPI.getPresignedUrl(menuId, uuidFileName);
        console.log('s3 url: ', url);
        // 4. S3 업로드
        await DetailsAPI.uploadToS3(url, compressedFile);

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

        const patchData: PatchMenuDetailsRequest = {
          preview: updated.preview,
          details: updated.details,
          tags: (updated.tags || []).map((t) => ({ id: t.id, tag: t.tag })),
          images: (updated.images || []).map((i) => ({
            id: i.id || 0,
            image_url: i.image_url,
            order: i.order,
          })),
        };

        console.log('patchData: ', patchData);

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
