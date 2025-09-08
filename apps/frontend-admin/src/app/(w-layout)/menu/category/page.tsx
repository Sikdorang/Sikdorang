'use client';

import SaveButton from '@/components/common/buttons/CtaButton';
import ConfirmModal from '@/components/common/modals/ConfirmModal';
import TextInputModal from '@/components/common/modals/TextInputModal';
import DragOverlayItem from '@/components/pages/menuCategory/DragOverlayItem';
import OrderTableRowSkeleton from '@/components/pages/menuCategory/OrderTableRowSkeleton';
import SortableCategoryItem from '@/components/pages/menuCategory/SortableCategoryItem';
import { useManageCategory } from '@/hooks/useManageCategory';
import { useManageMenu } from '@/hooks/useManageMenu';
import {
  flattenAll,
  flattenRender,
  itemKey,
  rebuildHierarchy,
} from '@/utilities/ordering';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { LexoRank } from 'lexorank';
import { useEffect, useId, useState } from 'react';

interface CategoryItem {
  id: number;
  name: string;
  order: string;
  parentId?: number;
  isExpanded?: boolean;
  children: CategoryItem[];
}

export default function MenuCategoryPage() {
  const dndId = useId();
  const { menus, fetchMenus, removeMenu, isMenusLoading, updateMenus } =
    useManageMenu();
  const { removeCategory, updateCategory } = useManageCategory();

  const [textModal, setTextModal] = useState<{
    open: boolean;
    id: number;
    name: string;
    subtitle: string;
    placeholder: string;
    isCat: boolean;
  }>({
    open: false,
    id: 0,
    name: '',
    subtitle: '',
    placeholder: '',
    isCat: false,
  });

  const [updatedCategoryOrders, setUpdatedCategoryOrders] = useState<
    { categoryId: number; order: string }[]
  >([]);
  const [updatedMenuOrders, setUpdatedMenuOrders] = useState<
    { menuId: number; order: string }[]
  >([]);

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<{
    open: boolean;
    id: number;
    name: string;
    isCat: boolean;
  }>({
    open: false,
    id: 0,
    name: '',
    isCat: false,
  });

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);
  useEffect(() => {
    if (!menus) return;
    const mapped: CategoryItem[] = menus.map((cat, idx) => ({
      id: cat.id,
      name: cat.category,
      order: cat.order,
      isExpanded: false,
      children: (cat.items ?? []).map((item, i) => ({
        id: item.id,
        name: item.name,
        order: item.order,
        parentId: cat.id,
        children: [],
      })),
    }));
    setCategories(mapped);
  }, [menus]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (e: DragStartEvent) =>
    setActiveId(e.active.id as string);

  const handleDragEnd = (e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) {
      setActiveId(null);
      return;
    }
    const flatAll = flattenAll(categories);
    const oldIdx = flatAll.findIndex((i) => itemKey(i) === e.active.id);
    const newIdx = flatAll.findIndex((i) => itemKey(i) === e.over.id);
    if (oldIdx < 0 || newIdx < 0) {
      setActiveId(null);
      return;
    }

    const movedFlat = arrayMove(flatAll, oldIdx, newIdx);
    const newTree = rebuildHierarchy(movedFlat);
    setCategories(newTree);
    setActiveId(null);

    const categoryOrderUpdates: { categoryId: number; order: string }[] = [];
    const menuOrderUpdates: { menuId: number; order: string }[] = [];

    newTree.forEach((cat, idx) => {
      const prev = newTree[idx - 1];
      const next = newTree[idx + 1];
      let newOrderRank: LexoRank;

      if (prev && next) {
        const prevRank = LexoRank.parse(prev.order);
        const nextRank = LexoRank.parse(next.order);
        newOrderRank = prevRank.between(nextRank);
      } else if (prev) {
        newOrderRank = LexoRank.parse(prev.order).genNext();
      } else if (next) {
        newOrderRank = LexoRank.parse(next.order).genPrev();
      } else {
        newOrderRank = LexoRank.min();
      }

      const newOrder = newOrderRank.toString();
      categoryOrderUpdates.push({ categoryId: cat.id, order: newOrder });
      cat.order = newOrder;

      cat.children.forEach((menu, jdx) => {
        const siblings = cat.children;
        const p = siblings[jdx - 1];
        const n = siblings[jdx + 1];
        let menuRank: LexoRank;

        if (p && n) {
          const pRank = LexoRank.parse(p.order);
          const nRank = LexoRank.parse(n.order);
          menuRank = pRank.between(nRank);
        } else if (p) {
          menuRank = LexoRank.parse(p.order).genNext();
        } else if (n) {
          menuRank = LexoRank.parse(n.order).genPrev();
        } else {
          menuRank = LexoRank.min();
        }

        const menuOrder = menuRank.toString();
        menuOrderUpdates.push({ menuId: menu.id, order: menuOrder });
        menu.order = menuOrder;
      });
    });

    console.log('debug categoryOrderUpdates: ', categoryOrderUpdates);
    console.log('debug menuOrderUpdates: ', menuOrderUpdates);

    setUpdatedCategoryOrders(categoryOrderUpdates);
    setUpdatedMenuOrders(menuOrderUpdates);
  };

  const toggle = (id: number) =>
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isExpanded: !c.isExpanded } : c)),
    );

  const requestDelete = (id: number) => {
    const flat = flattenAll(categories);
    const item = flat.find((i) => i.id === id)!;
    setConfirm({
      open: true,
      id,
      name: item.name,
      isCat: item.parentId == null,
    });
  };

  const confirmDelete = async () => {
    if (confirm.isCat) {
      await removeCategory(confirm.id);
      setCategories((prev) => prev.filter((c) => c.id !== confirm.id));
    } else {
      await removeMenu(confirm.id);
      setCategories((prev) =>
        prev.map((c) => ({
          ...c,
          children: c.children.filter((ch) => ch.id !== confirm.id),
        })),
      );
    }
    setConfirm({ open: false, id: 0, name: '', isCat: false });
  };

  const flatRender = flattenRender(categories);

  const overlayCategory = activeId
    ? flatRender.find((f) => itemKey(f) === activeId)
    : undefined;

  const openTextModal = (id: number, name: string, isCat: boolean) => {
    setTextModal({
      open: true,
      id,
      name,
      subtitle: isCat ? '카테고리명' : '메뉴명',
      placeholder: isCat
        ? '카테고리명을 입력해주세요.'
        : '메뉴명을 입력해주세요.',
      isCat,
    });
  };

  const handleConfirmText = async (text: string) => {
    if (!text.trim()) return;
    if (textModal.isCat) {
      await updateCategory(textModal.id, text);
      console.log('updateCategory', textModal.id, text);
      setCategories((prev) =>
        prev.map((c) => (c.id === textModal.id ? { ...c, name: text } : c)),
      );
    } else {
      await updateMenus([{ menuId: textModal.id, menu: text }]);
      setCategories((prev) =>
        prev.map((c) => ({
          ...c,
          children: c.children.map((ch) =>
            ch.id === textModal.id ? { ...ch, name: text } : ch,
          ),
        })),
      );
    }
    setTextModal({
      open: false,
      id: 0,
      name: '',
      subtitle: '',
      placeholder: '',
      isCat: false,
    });
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center px-8">
        <div className="flex-1 text-mb-1 text-gray-900">순서·카테고리 편집</div>
        <SaveButton text="변경사항 저장하기" width="fit" color="gray" />
      </div>

      <div className="w-full border-b border-gray-200" />

      {isMenusLoading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <OrderTableRowSkeleton key={i} idx={i} />
          ))}
        </div>
      ) : (
        <DndContext
          id={dndId}
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={flatRender.map(itemKey)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2 px-16">
              {flatRender.map((cat) => (
                <SortableCategoryItem
                  key={itemKey(cat)}
                  category={cat}
                  depth={cat.depth!}
                  isChild={cat.parentId != null}
                  onToggle={() => toggle(cat.id)}
                  onDelete={() => requestDelete(cat.id)}
                  onEdit={() =>
                    openTextModal(cat.id, cat.name, cat.parentId == null)
                  }
                />
              ))}
            </div>
          </SortableContext>
          <DragOverlay>
            {overlayCategory && <DragOverlayItem category={overlayCategory} />}
          </DragOverlay>
        </DndContext>
      )}

      <ConfirmModal
        isOpen={confirm.open}
        title={`${confirm.isCat ? '카테고리' : '메뉴'} 삭제`}
        message={`"${confirm.name}"을(를) 정말 삭제할까요?${confirm.isCat ? ' 카테고리 안의 메뉴들도 모두 삭제됩니다.' : ''}`}
        confirmText="삭제"
        cancelText="취소"
        onConfirm={confirmDelete}
        onCancel={() =>
          setConfirm({ open: false, id: 0, name: '', isCat: false })
        }
      />

      <TextInputModal
        isOpen={textModal.open}
        title={textModal.isCat ? '카테고리명 수정하기' : '메뉴명 수정하기'}
        subtitle={textModal.isCat ? textModal.subtitle : textModal.subtitle}
        placeholder={textModal.placeholder}
        initialValue={textModal.name}
        onConfirm={handleConfirmText}
        onCancel={() =>
          setTextModal({
            open: false,
            id: 0,
            name: '',
            subtitle: '',
            placeholder: '',
            isCat: false,
          })
        }
      />
    </div>
  );
}
