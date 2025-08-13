import { IMenuCategory, IMenuTableItem } from '@/types/model/menu';

export const convertToMenuTableItems = (
  data: IMenuCategory[],
): IMenuTableItem[] => {
  const menuTableItems: IMenuTableItem[] = [];

  data.forEach((categoryData) => {
    const categoryName = categoryData.category;
    categoryData.items.forEach((item) => {
      menuTableItems.push({
        id: item.id,
        name: item.name,
        price: item.price,
        category: categoryName,
        checked: false,
        status: item.status,
      });
    });
  });

  return menuTableItems;
};
