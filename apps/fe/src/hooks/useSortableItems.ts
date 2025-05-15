import { useState, useRef, useEffect } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { LexoRank } from 'lexorank';
import { OrderUpdatePayload } from '@/types/model/payload';

export function useSortableItems<T extends { id: number }>(initial: T[]) {
  const [items, setItems] = useState<T[]>(initial);
  const initialRef = useRef<T[]>(initial);
  const [hasChanges, setHasChanges] = useState(false);

  const resetInitial = () => {
    initialRef.current = [...items];
    setHasChanges(false);
  };

  useEffect(() => {
    const isChanged = items.some((item, index) => item.id !== initialRef.current[index]?.id);
    setHasChanges(isChanged);
  }, [items]);

  const handleReorder = (oldIndex: number, newIndex: number) => {
    setItems((prev) => arrayMove(prev, oldIndex, newIndex));
  };

  const getChangedItems = () => {
    const ranks = generateLexoRanks(items.length);
    return items.reduce((acc, item, index) => {
      const originalIndex = initialRef.current.findIndex((i) => i.id === item.id);
      if (originalIndex !== index) {
        acc.push({
          id: item.id,
          order: ranks[index],
        });
      }
      return acc;
    }, [] as OrderUpdatePayload[]);
  };

  return { items, handleReorder, getChangedItems, setItems, hasChanges, resetInitial };
}

function generateLexoRanks(length: number): string[] {
  const ranks: string[] = [];
  let rank = LexoRank.middle();
  for (let i = 0; i < length; i++) {
    rank = i === 0 ? LexoRank.middle() : rank.genNext();
    ranks.push(rank.toString());
  }
  return ranks;
}
