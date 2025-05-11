import { SYNC_ACTIONS } from '@/constants/enums';

export interface IMenuDetailsItem {
  preview: string;
  details: string;
  tags: IMenuTagItem[];
  images: IMenuImageItem[];
}

export interface IMenuTagItem {
  id: number;
  tag: string;
}

export interface IMenuImageItem {
  id: number;
  url: string;
  image_url: string;
  order: string;
  file?: File;
  preview?: string;
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
  menu: string;
  preview?: string;
  order?: string;
  image_urls: string[];
  details: string;
  price: number;
  status: boolean;
  tags?: string[];
}
