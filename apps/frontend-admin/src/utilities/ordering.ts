interface CategoryItem {
  id: number;
  name: string;
  order: string;
  parentId?: number;
  isExpanded?: boolean;
  children: CategoryItem[];
}

export function flattenAll(
  items: CategoryItem[],
  depth = 0,
): (CategoryItem & { depth: number })[] {
  return items.flatMap((item) => [
    { ...item, depth },
    ...flattenAll(item.children, depth + 1),
  ]);
}

export function flattenRender(
  items: CategoryItem[],
  depth = 0,
): (CategoryItem & { depth: number })[] {
  return items.flatMap((item) => {
    const row = { ...item, depth };
    if (item.isExpanded) {
      return [row, ...flattenRender(item.children, depth + 1)];
    }
    return [row];
  });
}

export function rebuildHierarchy(
  flat: (CategoryItem & { depth: number })[],
): CategoryItem[] {
  const map = new Map<string, CategoryItem & { depth: number }>();
  flat.forEach((item) => {
    map.set(itemKey(item), { ...item, children: [] });
  });
  const roots: CategoryItem[] = [];
  flat.forEach((item) => {
    const key = itemKey(item);
    const node = map.get(key)!;
    if (item.parentId != null) {
      map.get(`cat-${item.parentId}`)!.children.push(node);
    } else {
      roots.push(node);
    }
  });
  return roots;
}

export const itemKey = (item: CategoryItem) =>
  item.parentId != null
    ? `cat-${item.parentId}-item-${item.id}`
    : `cat-${item.id}`;
