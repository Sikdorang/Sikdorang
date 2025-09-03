export interface IMenuItem {
  id: number;
  name: string;
  price: number;
  isNew: boolean;
  isPopular: boolean;
  status: string;
  imgUrl?: string;
}

export interface IMenuCategory {
  id: number;
  category: string;
  items: IMenuItem[];
}
export interface IMenuCategory {
  id: number;
  category: string;
  items: IMenuItem[];
}

export interface IMenuTableItem {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  checked: boolean;
  status: string;
}

export interface IRecommendTableItem {
  id: number;
  name: string;
  description: string;
  result: string;
  img: string;
}

export interface IMenuImageItem {
  id: number;
  image_url: string;
  url?: string;
  order: string;
  file?: File;
  preview?: string;
}

export interface IMenuOptionItem {
  optionId: number;
  optionDetailId: number;
  name: string;
  price: number;
}

export interface IMenuOptionGroup {
  groupId: string;
  title: string;
  required: boolean;
  minSelectable: number;
  maxSelectable: number;
  items: IMenuOptionItem[];
}

export interface IMenuDetailItem {
  id: number;
  name: string;
  description: string;
  price: number;
  isNew: boolean;
  isPopular: boolean;
  images: IMenuImageItem[];
  status: string;
  optionGroups: IMenuOptionGroup[];
}

export interface IToggleSwitch {
  label: string;
  value?: boolean;
}

export interface ICreateMenuRequest {
  menu: string;
  price?: number;
  categoryId: number;
  status: string;
  order: string;
}
