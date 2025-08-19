export interface IInfoItem {
  key: string;
  value: string;
  order: string;
}

export interface IStoreInfo {
  id: number;
  name: string;
  infoItems: InfoItem[];
}
