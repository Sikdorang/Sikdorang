import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/messages';
import { handelError } from '@/services/handleErrors';
import { MenuAPI } from '@/services/menu';
import { IMenuCategory } from '@/types/model/menu';
import axios from 'axios';
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
      console.log(response);
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

  const createMenus = async (syncData: ISyncMenuRequest[]) => {
    try {
      const newMenus = await MenuAPI.createMenus(syncData);
      setMenus((prev) => [...prev, ...newMenus]);
      toast.success(SUCCESS_MESSAGES.createMenuSuccess);
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

  const updateMenus = async (syncData: ISyncMenuRequest[]) => {
    try {
      const updatedMenus = await MenuAPI.updateMenus(syncData);
      setMenus((prev) =>
        prev.map((menu) => updatedMenus.find((u) => u.id === menu.id) || menu),
      );
      toast.success(SUCCESS_MESSAGES.updateMenuSuccess);
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
        } else if (error.response?.status === 404) {
          setMenuError(ERROR_MESSAGES.unknownMenuError);
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

  const updateMenuDetails = async (menuId: number) => {
    try {
      await MenuAPI.updateMenuDetails(menuId);
      toast.success(SUCCESS_MESSAGES.updateMenuSuccess);
    } catch (error) {
      handelError(error);
    }
  };

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
  };
};
