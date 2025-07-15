import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type OptionSelection = Record<string, string[]>; // groupId → itemIds

interface CartItem {
  id: string;
  menuId: string;
  menuName: string;
  basePrice: number;
  quantity: number;
  options: Record<string, string[]>; // 옵션 선택 내역
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

function generateItemId(menuId: string, options: Record<string, string[]>) {
  return `${menuId}::${Object.entries(options)
    .map(([groupId, itemIds]) => `${groupId}:${[...itemIds].sort().join(',')}`)
    .sort() // group 순서도 보장
    .join('|')}`;
}
export const useCartStore = create<CartStore>()(
  immer((set, get) => ({
    items: [],

    addItem: (item) =>
      set((state) => {
        const id = generateItemId(item.menuId, item.options);
        const existing = state.items.find((i) => i.id === id);

        if (existing) {
          existing.quantity += item.quantity;
        } else {
          state.items.push({ ...item, id });
        }
      }),

    removeItem: (id) =>
      set((state) => {
        state.items = state.items.filter((i) => i.id !== id);
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
      return items.reduce(
        (acc, item) => acc + item.basePrice * item.quantity,
        0,
      );
    },
  })),
);
