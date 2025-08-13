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

export interface IMenuTableItem {
  id: number;
  name: string;
  price: number;
  category: string;
  checked: boolean;
  status: string;
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
  optionId: string;
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

export interface IMenuDetailResponse {
  id: string;
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
