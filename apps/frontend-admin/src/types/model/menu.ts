export interface IMenuTableItem {
  id: number;
  checked: boolean;
  name: string;
  price: number | null;
  category: string | null;
  status: string;
  order: string;
}

export interface IMenuImageItem {
  id: number;
  image_url: string;
  url?: string;
  order: string;
  file?: File;
  preview?: string;
}

export interface IMenuOption {
  id: string;
  name: string;
  price?: number;
}
