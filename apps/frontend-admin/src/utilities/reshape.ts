import { IMenuCategory, IMenuTableItem } from '@/types/model/menu';

export const convertToMenuTableItems = (
  data: IMenuCategory[],
): IMenuTableItem[] => {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  const menuTableItems: IMenuTableItem[] = [];

  data.forEach((categoryData) => {
    if (!categoryData?.items || !Array.isArray(categoryData.items)) {
      return;
    }
    const categoryId = Number(categoryData.id);
    categoryData.items.forEach((item) => {
      if (item) {
        menuTableItems.push({
          id: Number(item.id),
          name: item.name,
          price: item.price,

          categoryId,
          checked: false,
          status: item.status ?? 'SALE',
        });
      }
    });
  });

  return menuTableItems;
};
