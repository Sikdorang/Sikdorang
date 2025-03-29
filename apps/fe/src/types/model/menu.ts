export interface IMenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  status: boolean;
  images: string[];
  tags?: string[];
}
