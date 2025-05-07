import { create } from 'zustand';
import { arrayMove } from '@dnd-kit/sortable';
import { LexoRank } from 'lexorank';
import { IMenuItem } from '@/types/model/menu';
import { OrderUpdatePayload } from '@/types/model/payload';

interface MenuState {
  initialMenus: Map<number, IMenuItem[]>;
  menus: Map<number, IMenuItem[]>;
  setInitialData: (data: { id: number; menus: IMenuItem[] }[]) => void;
  handleReorder: (categoryId: number, oldIndex: number, newIndex: number) => void;
  getChangedItems: () => OrderUpdatePayload[];
}

export const useMenuOrderStore = create<MenuState>((set, get) => ({
  initialMenus: new Map(),
  menus: new Map(),

  setInitialData: (data) => {
    const initial = new Map<number, IMenuItem[]>();
    const current = new Map<number, IMenuItem[]>();
    data.forEach(({ id, menus }) => {
      console.log(data, id, menus);
      initial.set(id, menus !== null ? [...menus] : []);
      current.set(id, menus !== null ? [...menus] : []);
    });
    set({ initialMenus: initial, menus: current });
  },

  handleReorder: (categoryId, oldIndex, newIndex) => {
    const menus = new Map(get().menus);
    const categoryMenus = menus.get(categoryId);
    if (!categoryMenus) return;
    const newOrder = arrayMove(categoryMenus, oldIndex, newIndex);
    menus.set(categoryId, newOrder);
    set({ menus });
  },

  getChangedItems: () => {
    const { initialMenus, menus } = get();
    const result: OrderUpdatePayload[] = [];

    menus.forEach((currentList, categoryId) => {
      const originalList = initialMenus.get(categoryId) ?? [];

      const ranks = generateLexoRanks(currentList.length);

      currentList.forEach((item, index) => {
        const originalIndex = originalList.findIndex((i) => i.id === item.id);
        if (originalIndex !== index) {
          result.push({
            id: item.id,
            order: ranks[index],
          });
        }
      });
    });

    return result;
  },
}));

function generateLexoRanks(length: number): string[] {
  const ranks: string[] = [];
  let rank = LexoRank.middle();
  for (let i = 0; i < length; i++) {
    rank = i === 0 ? LexoRank.middle() : rank.genNext();
    ranks.push(rank.toString());
  }
  return ranks;
}
