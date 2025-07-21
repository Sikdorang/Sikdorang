import { CategoryGroupData } from './data/CategoryGroupData';
import { MenuDetailsData } from './data/MenuDetailsData';
import { API_BASE_URL } from '@/apis/api';
import { delay, http, HttpResponse } from 'msw';

interface MenuIdsRequestBody {
  menuIds: string[];
}

export const menuHandler = [
  // 전체 메뉴 리스트
  http.get(`${API_BASE_URL}/menus`, async () => {
    await delay(1000);
    return HttpResponse.json(CategoryGroupData);
  }),

  // 개별 메뉴 상세
  http.get(`${API_BASE_URL}/menus/:menuId`, async ({ params }) => {
    await delay(1000);
    const rawId = params.menuId;
    const menuId = Array.isArray(rawId) ? rawId[0] : rawId;

    if (!menuId || !MenuDetailsData[menuId]) {
      return HttpResponse.json(
        { message: '메뉴를 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    return HttpResponse.json(MenuDetailsData[menuId]);
  }),

  http.post(`${API_BASE_URL}/menus/by-ids`, async ({ request }) => {
    await delay(1000);
    const { menuIds } = (await request.json()) as MenuIdsRequestBody;

    if (!Array.isArray(menuIds)) {
      return HttpResponse.json(
        { message: 'menuIds는 배열이어야 합니다.' },
        { status: 400 },
      );
    }

    const menus: Record<string, IMenuDetail> = {};
    menuIds.forEach((id: string) => {
      const menu = MenuDetailsData[id];
      if (menu) {
        menus[id] = menu;
      }
    });

    return HttpResponse.json({ menus });
  }),
];
