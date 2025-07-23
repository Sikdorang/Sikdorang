import { IMenuImageItem, IMenuOption } from '../model/menu';

export interface EditModalFormData {
  name: string;
  price?: number;
  category?: number;
  description?: string;
  images: IMenuImageItem[];
  options: IMenuOption[];
  toggleStates: {
    [key: string]: boolean;
  };
}
