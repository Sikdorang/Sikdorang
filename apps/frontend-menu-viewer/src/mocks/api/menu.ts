import { delay, http, HttpResponse } from 'msw';
import { CategoryGroupData } from './data/CategoryGroupData';

export const menuHandler = [
  http.get(`${import.meta.env.VITE_API_URL}/menus`, async () => {
    await delay(1000);
    return HttpResponse.json(CategoryGroupData);
  }),
];
