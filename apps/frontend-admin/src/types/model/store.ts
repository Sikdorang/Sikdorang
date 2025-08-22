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

export interface ISettingAction {
  label: string;
  onClick: () => void;
  type: 'depth' | 'toggle' | 'none';
}
