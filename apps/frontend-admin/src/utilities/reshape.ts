import {
  IMenuCardItem,
  IMenuCategory,
  IMenuTableItem,
} from '@/types/model/menu';

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

export function convertToMenuCardItems(
  categories: IMenuCategory[],
): IMenuCardItem[] {
  return categories.flatMap((cat) =>
    cat.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      isNew: item.isNew,
      isPopular: item.isPopular,
      imgUrl: item.imgUrl,
      categoryId: cat.id,
      status: item.status,
      order: item.order,
    })),
  );
}
