import { useMemo, useRef } from 'react';
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
        // ❗ 이 훅은 최상단에서만 호출되므로 이 시점에서 상태 생성은 안전
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
