import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/messages';
import { handelError } from '@/services/handleErrors';
import { MenuAPI } from '@/services/menu';
import {
  ICreateMenuRequest,
  IMenuCategory,
  IMenuImageItem,
  PresignImageEntry,
} from '@/types/model/menu';
import {
  UpdateMenuDetailsDto,
  UpdateMenuOptionsDto,
} from '@/types/request/menu';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

export const useManageMenu = () => {
  const [menus, setMenus] = useState<IMenuCategory[]>([]);
  const [isMenusLoading, setIsMenusLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(true);
  const [menuError, setMenuError] = useState<string | null>(null);

  const fetchMenus = useCallback(async () => {
    setMenuError(null);
    try {
      const response = await MenuAPI.getAllMenus();
      setMenus(response);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setMenuError(ERROR_MESSAGES.authenticationError);
      } else {
        handelError(error);
      }
    } finally {
      setIsMenusLoading(false);
    }
  }, []);

  const createMenus = async (data: ICreateMenuRequest[]) => {
    setIsMenusLoading(true);
    try {
      const response = await MenuAPI.createMenus(data);
      const newMenus = Array.isArray(response) ? response : [response];
      setMenus((prev) => [...prev, ...newMenus]);
      toast.success(SUCCESS_MESSAGES.createMenuSuccess);
      return newMenus;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setMenuError(ERROR_MESSAGES.badRequestError);
        } else if (error.response?.status === 401) {
          setMenuError(ERROR_MESSAGES.authenticationError);
        } else {
          handelError(error);
        }
      }
      throw error;
    } finally {
      setIsMenusLoading(false);
    }
  };

  const updateMenus = async (
    syncData: Array<{
      menuId: number;
      menu?: string;
      price?: number;
      categoryId?: number;
      status?: string;
      order?: string;
    }>,
  ) => {
    setIsMenusLoading(true);
    try {
      // 서버에 변경된 필드만 담긴 syncData 전송
      const updatedMenus = await MenuAPI.updateMenus(syncData);
      // 기존 메뉴 배열에 server 반환값을 반영
      setMenus((prev) =>
        prev.map((menu) => updatedMenus.find((u) => u.id === menu.id) ?? menu),
      );
      toast.success(SUCCESS_MESSAGES.updateMenuSuccess);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400) {
          setMenuError(ERROR_MESSAGES.badRequestError);
        } else if (status === 401) {
          setMenuError(ERROR_MESSAGES.authenticationError);
        } else {
          // 기타 에러 핸들링
          console.error(error);
        }
      }
    } finally {
      setIsMenusLoading(false);
    }
  };

  const removeMenu = async (menuId: number) => {
    try {
      await MenuAPI.deleteMenus(menuId);
      setMenus((prev) => prev.filter((menu) => menu.id !== menuId));
      toast.success(SUCCESS_MESSAGES.deleteMenuSuccess);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setMenuError(ERROR_MESSAGES.badRequestError);
        } else if (error.response?.status === 401) {
          setMenuError(ERROR_MESSAGES.authenticationError);
        } else {
          handelError(error);
        }
      }
    } finally {
      setIsMenusLoading(false);
    }
  };

  const getMenuDetails = async (menuId: number) => {
    try {
      const details = await MenuAPI.getMenuDetails(menuId);
      return details;
    } catch (error) {
      handelError(error);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const updateMenuDetails = async (
    menuId: number,
    payload: UpdateMenuDetailsDto,
  ) => {
    try {
      await MenuAPI.updateMenuDetails(menuId, payload);
      toast.success(SUCCESS_MESSAGES.updateMenuSuccess);
    } catch (error) {
      handelError(error);
    }
  };

  const updateMenuOptions = async (payload: UpdateMenuOptionsDto) => {
    try {
      await MenuAPI.updateMenuOptions(payload);
      toast.success(SUCCESS_MESSAGES.updateMenuSuccess);
    } catch (error) {
      handelError(error);
    }
  };

  const updateMenuImages = useCallback(
    async (
      menuId: number,
      toUpload: IMenuImageItem[],
      uploaded: IMenuImageItem[],
    ) => {
      const registerPayload = toUpload.map((img) => ({
        image: img.image_url + '.webp',
        order: img.order,
      }));

      const presignList: PresignImageEntry[] = await MenuAPI.updateMenuImages(
        menuId,
        registerPayload,
      );

      for (const entry of presignList) {
        const img = toUpload.find((i) => i.order === entry.order);
        if (!img?.file) continue;

        const compressed = await imageCompression(img.file, {
          maxSizeMB: 2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: 'image/webp',
          initialQuality: 0.75,
        });

        await MenuAPI.uploadToS3(entry.uploadUrl, compressed);

        uploaded.push({
          ...img,
          id: entry.id,
          image_url: entry.publicUrl,
          order: entry.order,
          file: undefined,
        });
      }

      return uploaded;
    },
    [menus],
  );
  return {
    menus,
    isMenusLoading,
    isDetailLoading,
    menuError,
    fetchMenus,
    createMenus,
    updateMenus,
    removeMenu,
    getMenuDetails,
    updateMenuDetails,
    updateMenuOptions,
    updateMenuImages,
  };
};
