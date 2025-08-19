export interface UpdateStoreRequest {
  store?: string;
  wifiId?: string;
  wifiPassword?: string;
  phoneNumber?: string;
  naverPlace?: string;
  corkagePossible?: boolean;
  corkageFee?: string;
  toilet?: string;
  time?: Array<{}>;
}

export type UpdateStoreNameRequest = Pick<UpdateStoreRequest, 'store'>;
