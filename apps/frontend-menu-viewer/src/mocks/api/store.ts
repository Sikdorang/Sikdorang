import { StoreInfoData } from './data/StoreInfoData';
import { API_BASE_URL } from '@/apis/api';
import { delay, http, HttpResponse } from 'msw';

export const storeHandlers = [
  http.get(`${API_BASE_URL}/stores/:storeId`, async () => {
    await delay(500);
    return HttpResponse.json(StoreInfoData);
  }),
];
