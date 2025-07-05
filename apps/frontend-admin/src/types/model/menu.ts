export interface IMenuTableItem {
  id: number;
  checked: boolean;
  name: string;
  price: number | null;
  category: string | null;
  status: string;
  order: string;
}
