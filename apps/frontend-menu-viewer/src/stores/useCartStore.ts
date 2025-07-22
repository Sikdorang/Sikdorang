import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface CartStore {
  items: ICartItem[];
  addItem: (item: Omit<ICartItem, 'id' | 'selected'>) => void;
  updateItem: (id: string, updates: Partial<ICartItem>) => void;
  removeItem: (id: string) => void;
  toggleSelect: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getSelectedItemCount: () => number;
  selectAllItems: () => void;
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

    updateItem: (id, updates) =>
      set((state) => {
        const itemIndex = state.items.findIndex((i) => i.id === id);
        if (itemIndex === -1) return;

        const item = state.items[itemIndex];
        const updatedItem = { ...item, ...updates };

        const newId = generateItemId(
          updatedItem.originalItem.id,
          updatedItem.selectedOptions,
        );
        updatedItem.id = newId;
        state.items[itemIndex] = updatedItem;
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

    getSelectedItemCount: () => {
      return get().items.filter((item) => item.selected).length;
    },

    selectAllItems: () =>
      set((state) => {
        state.items.forEach((item) => {
          item.selected = true;
        });
      }),
  })),
);
