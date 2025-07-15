import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface MenuSelectionStore {
  menuId: string | null;
  quantity: number;
  optionPrice: number;
  selectedOptions: OptionSelection;
  optionItemPriceMap: Record<string, number>;

  startMenu: (menu: IMenuDetail) => void;
  setQuantity: (qty: number) => void;
  toggleOption: (groupId: string, itemId: string, isSingle: boolean) => void;
  resetSelection: () => void;
}

export const useMenuSelectionStore = create<MenuSelectionStore>()(
  immer((set) => ({
    menuId: null,
    quantity: 1,
    optionPrice: 0,
    selectedOptions: {},
    optionItemPriceMap: {},

    startMenu: (menu) =>
      set((state) => {
        state.menuId = menu.id;
        state.quantity = 1;
        state.optionPrice = 0;
        state.selectedOptions = {};

        const map: Record<string, number> = {};
        for (const group of menu.optionGroups) {
          for (const item of group.items) {
            map[item.id] = item.price;
          }
        }

        state.optionItemPriceMap = map;
      }),

    setQuantity: (qty) =>
      set((state) => {
        state.quantity = Math.max(1, qty);
      }),

    toggleOption: (groupId, itemId, isSingle) =>
      set((state) => {
        if (isSingle) {
          // radio일 때
          const prevId = state.selectedOptions[groupId]?.size
            ? [...state.selectedOptions[groupId]][0]
            : undefined;
          if (prevId === itemId) return;

          if (prevId) {
            const prevItemPrice = state.optionItemPriceMap[prevId] ?? 0;
            state.optionPrice -= prevItemPrice;
          }

          state.selectedOptions[groupId] = new Set([itemId]);
          const currentItemPrice = state.optionItemPriceMap[itemId] ?? 0;
          state.optionPrice += currentItemPrice;
        } else {
          // checkbox일 때
          const current = state.selectedOptions[groupId] ?? new Set();
          const currentItemPrice = state.optionItemPriceMap[itemId] ?? 0;
          if (current.has(itemId)) {
            current.delete(itemId);
            state.optionPrice -= currentItemPrice;
          } else {
            current.add(itemId);
            state.optionPrice += currentItemPrice;
          }
          state.selectedOptions[groupId] = current;
        }
      }),

    resetSelection: () =>
      set((state) => {
        state.menuId = null;
        state.quantity = 1;
        state.selectedOptions = {};
      }),
  })),
);
