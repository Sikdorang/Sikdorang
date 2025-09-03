export interface IInfoItem {
  key: string;
  value: string;
  order: string;
}

export interface IStoreInfo {
  id: number;
  name: string;
  infoItems: IInfoItem[];
}

export interface ISettingAction {
  label: string;
  onClick: () => void;
  type: 'depth' | 'toggle' | 'none';
}

export interface ISettingStates {
  businessOpen: boolean;
  realtimeOrderAlert: boolean;
  recommendEnabled: boolean;
}

export interface ISettingAction {
  label: string;
  onClick: () => void;
  type: 'depth' | 'toggle' | 'none';
}

export interface ISettingStates {
  businessOpen: boolean;
  realtimeOrderAlert: boolean;
  recommendEnabled: boolean;
}
