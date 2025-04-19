import { SYNC_ACTIONS } from '@/constants/enums';

export interface IMenuDetailsItem {
  preview: string;
  details: string;
  tags: string[];
  images: string[];
}

export interface IManageMenuItem {
  id: number;
  menu: string;
  price: number | null;
  category: string | null;
  status: string;
  order: string;
}

export interface ISyncMenuRequest {
  action: (typeof SYNC_ACTIONS)[keyof typeof SYNC_ACTIONS];
  id: number;
  data: Record<string, unknown>;
}
export interface IMenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  status: boolean;
  images: string[];
  tags?: string[];
}
