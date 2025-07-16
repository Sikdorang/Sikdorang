import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface CartItem {
  id: string;
  selected: boolean;
  originalItem: IMenuDetail;
  optionPrice: number;
  quantity: number;
  selectedOptions: OptionSelection;
  optionItemPriceMap: Record<string, number>;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id' | 'selected'>) => void;
  removeItem: (id: string) => void;
  toggleSelect: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

function generateItemId(menuId: string, options: OptionSelection) {
  return `${menuId}::${Object.entries(options)
    .map(([groupId, itemIds]) => `${groupId}:${[...itemIds].sort().join(',')}`)
    .sort()
    .join('|')}`;
}
export const useCartStore = create<CartStore>()(
  immer((set, get) => ({
    items: [],

    addItem: (item) =>
      set((state) => {
        const id = generateItemId(item.originalItem.id, item.selectedOptions);
        const existing = state.items.find((i) => i.id === id);

        if (existing) {
          existing.quantity += item.quantity;
        } else {
          state.items.push({ ...item, selected: true, id });
        }
      }),

    removeItem: (id) =>
      set((state) => {
        state.items = state.items.filter((i) => i.id !== id);
      }),

    toggleSelect: (id) =>
      set((state) => {
        const item = state.items.find((i) => i.id === id);
        if (item) item.selected = !item.selected;
      }),

    setQuantity: (id, qty) =>
      set((state) => {
        const item = state.items.find((i) => i.id === id);
        if (item) item.quantity = Math.max(1, qty);
      }),

    clearCart: () =>
      set((state) => {
        state.items = [];
      }),

    getTotalPrice: () => {
      const items = get().items;
      return items.reduce((acc, item) => {
        if (!item.selected) return acc;
        return (
          acc +
          (item.optionPrice + (item.originalItem.price ?? 0)) * item.quantity
        );
      }, 0);
    },
  })),
);
