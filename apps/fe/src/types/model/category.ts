import { IMenuItem } from './menu';

export interface ICategoryItem {
  id: number;
  category: string;
  order: string;
}

export interface ICategoryWithMenus {
  id: number;
  category: string;
  order?: string;
  menus: IMenuItem[];
}
