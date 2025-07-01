import { http, HttpResponse } from 'msw';
import { CategoryGroupData } from './data/CategoryGroupData';

export const menuHandler = [
  http.get(`${import.meta.env.VITE_API_BASE_URL}/menus`, () => {
    return HttpResponse.json(CategoryGroupData);
  }),
];
