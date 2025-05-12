import axios from 'axios';
import { useCallback, useState } from 'react';
import { MESSAGES } from '@/constants/messages';
import { toast } from 'react-toastify';
import { DetailsAPI, PatchMenuDetailsRequest } from '@/services/manageMenuDetails';
import { handelError } from '@/services/handleError';
import { IMenuDetailsItem, IMenuImageItem } from '@/types/model/menu';
import { isEqual } from 'lodash';
import { ImagePool } from '@squoosh/lib';

export const useManageMenuDetails = () => {
  const [menusDetails, setMenusDetails] = useState<IMenuDetailsItem>();
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log(isUploading);

  const fetchMenusDetails = async (menuId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await DetailsAPI.getMenuDetails(menuId);
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

      // 1. Squoosh 이미지 풀 생성
      const imagePool = new ImagePool();

      for (const img of newImages) {
        const file = img.file;
        if (!file || !img.image_url) continue;

        // 2. 이미지 압축
        const arrayBuffer = await file.arrayBuffer();
        const image = imagePool.ingestImage(new Uint8Array(arrayBuffer));
        await image.encode({
          webp: { quality: 75 },
        });

        const { binary } = await image.encodedWith.webp;
        const compressedFile = new File([binary], file.name.replace(/\.\w+$/, '.webp'), {
          type: 'image/webp',
        });

        // 3. 확장자 변경 (webp)
        const uuidFileName = `${img.image_url}.webp`;

        // 4. Presigned URL 요청
        const { url } = await DetailsAPI.getPresignedUrl(menuId, uuidFileName);

        // 5. S3 업로드
        await DetailsAPI.uploadToS3(url, compressedFile);

        uploadedImages.push({
          ...img,
          image_url: uuidFileName,
        });
      }

      await imagePool.close();
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

        const patchData: PatchMenuDetailsRequest = {};
        if (original.preview !== updated.preview) {
          patchData.preview = updated.preview;
        }
        if (original.details !== updated.details) {
          patchData.details = updated.details;
        }
        if (!isEqual(original.tags || [], updated.tags || [])) {
          patchData.tags = (updated.tags || []).map((t) => ({ id: t.id, tag: t.tag }));
        }
        if (!isEqual(original.images || [], mergedImages)) {
          patchData.images = mergedImages.map((i) => ({
            id: i.id || 0,
            image_url: i.image_url,
            order: i.order,
          }));
        }

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
