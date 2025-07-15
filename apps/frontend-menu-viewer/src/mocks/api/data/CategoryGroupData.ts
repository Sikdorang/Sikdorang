import { MenuDetailsData } from './MenuDetailsData';

export const MenuCategoryMap: Record<string, string> = {
  '1': '추천 메뉴',
  '2': '추천 메뉴',
  '3': '추천 메뉴',
  '4': '식사류',
  '5': '식사류',
  '6': '식사류',
  '7': '식사류',
  '8': '사이드',
  '9': '사이드',
  '10': '사이드',
};

const grouped: Record<string, IMenuListItem[]> = {};

for (const [id, detail] of Object.entries(MenuDetailsData)) {
  const category = MenuCategoryMap[id] ?? '기타';

  if (!grouped[category]) grouped[category] = [];

  grouped[category].push({
    id,
    name: detail.name,
    price: detail.price,
    isNew: detail.isNew,
    isPopular: detail.isPopular,
    imgUrl: detail.imageUrls?.[0],
  });
}

export const CategoryGroupData: ICategoryGroup[] = Object.entries(grouped).map(
  ([categoryName, items], idx) => ({
    id: `${idx + 1}`,
    category: categoryName,
    items,
  }),
);
