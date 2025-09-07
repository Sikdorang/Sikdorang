export interface OpeningHour {
  day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  startHour: number;
  startMin: number;
  endHour: number;
  endMin: number;
  open: boolean;
}
export interface UpdateStoreRequest {
  store?: string;
  wifiId?: string;
  wifiPassword?: string;
  phoneNumber?: string;
  naverPlace?: string;
  corkagePossible?: boolean;
  corkagePrice?: number;
  toilet?: string;
  time?: OpeningHour[];
}

export type UpdateStoreNameRequest = Pick<UpdateStoreRequest, 'store'>;
