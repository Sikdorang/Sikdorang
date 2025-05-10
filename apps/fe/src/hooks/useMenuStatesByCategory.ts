import { useRef } from 'react';
import { useSortableItems } from './useSortableItems';
import { ICategoryWithMenus } from '@/types/model/category';
import { IMenuItem } from '@/types/model/menu';

export function useMenuStatesByCategory(categories: ICategoryWithMenus[]) {
  const menuStates = useRef(new Map<number, ReturnType<typeof useSortableItems<IMenuItem>>>());

  const useMenuState = (categoryId: number | null) => {
    if (categoryId === null) return null;

    if (!menuStates.current.has(categoryId)) {
      const category = categories.find((c) => c.id === categoryId);
      if (category) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const state = useSortableItems<IMenuItem>(category.menus);
        menuStates.current.set(categoryId, state);
      }
    }

    return menuStates.current.get(categoryId) ?? null;
  };

  const getAllChangedItems = () => {
    const result: { id: number; order: string }[] = [];
    menuStates.current.forEach((state) => {
      result.push(...state.getChangedItems());
    });
    return result;
  };

  return { useMenuState, getAllChangedItems };
}
