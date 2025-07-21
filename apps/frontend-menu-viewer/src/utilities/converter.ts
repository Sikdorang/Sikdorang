export function convertToCartItems(
  orderMenu: IOrderMenuItem,
  menu: IMenuDetail,
): Omit<ICartItem, 'id' | 'selected'> {
  const selectedOptions: OptionSelection = {};
  const optionItemPriceMap: Record<string, number> = {};

  orderMenu.optionGroups.forEach((group) => {
    selectedOptions[group.id] = new Set(
      group.items.map((opt) => {
        optionItemPriceMap[opt.id] = opt.price;
        return opt.id;
      }),
    );
  });

  return {
    originalItem: menu,
    optionPrice: orderMenu.optionPrice,
    quantity: orderMenu.quantity,
    selectedOptions,
    optionItemPriceMap,
  };
}
