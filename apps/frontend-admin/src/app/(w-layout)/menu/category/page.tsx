'use client';

import { default as SaveButton } from '@/components/common/buttons/CtaButton';
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
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

import ChevronDownIcon from '@public/icons/ic_chevron_down.svg';
import ChevronRightIcon from '@public/icons/ic_chevron_right.svg';
import DragIcon from '@public/icons/ic_dots.svg';
import EditIcon from '@public/icons/ic_pencil.svg';
import DeleteIcon from '@public/icons/ic_trashcan.svg';
import Image from 'next/image';

// 타입 정의
interface CategoryItem {
  id: string;
  name: string;
  order: number;
  parentId?: string | null;
  children?: CategoryItem[];
  isExpanded?: boolean;
}

interface SortableCategoryItemProps {
  category: CategoryItem;
  depth: number;
  onEdit: (categoryId: string) => void;
  onDelete: (categoryId: string) => void;
  onToggle: (categoryId: string) => void;
  isChild?: boolean;
}

// 개별 카테고리 아이템 컴포넌트
function SortableCategoryItem({
  category,
  depth = 0,
  onEdit,
  onDelete,
  onToggle,
  isChild = false,
}: SortableCategoryItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: category.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const hasChildren = category.children && category.children.length > 0;
  const paddingLeft = depth * 20 + (isChild ? 20 : 0);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 border-b border-gray-200 bg-white p-4 transition-all duration-200 ${isDragging ? 'z-50 shadow-lg' : 'hover:border-gray-300 hover:shadow-md'} ${isChild ? 'ml-6 bg-gray-50' : ''} `}
      style={{ ...style, paddingLeft: `${paddingLeft}px` }}
    >
      {/* 드래그 핸들 */}
      <div
        {...attributes}
        {...listeners}
        className="flex cursor-grab touch-none flex-col gap-1 px-4 text-gray-400 active:cursor-grabbing"
        aria-label="드래그 핸들"
      >
        <Image src={DragIcon} alt="drag" />
      </div>

      {/* 펼치기/접기 버튼 (자식이 있는 경우만) */}
      {hasChildren && (
        <button
          onClick={() => onToggle(category.id)}
          className="flex h-6 w-6 items-center justify-center rounded text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          aria-label={category.isExpanded ? '접기' : '펼치기'}
        >
          {category.isExpanded ? (
            <Image src={ChevronDownIcon} alt="chevron-down" />
          ) : (
            <Image src={ChevronRightIcon} alt="chevron-right" />
          )}
        </button>
      )}

      {/* 카테고리 이름 */}
      <div className="flex-1">
        <span
          className={`text-mobile-body-l-semibold ${isChild ? 'text-gray-700' : 'text-gray-900'}`}
        >
          {category.name}
        </span>
        {hasChildren && (
          <span className="ml-2 text-sm text-gray-500">
            {category.children?.length}
          </span>
        )}
      </div>

      {/* 액션 버튼들 */}
      <div className="flex items-center gap-2">
        {/* 편집 버튼 */}
        <button
          onClick={() => onEdit(category.id)}
          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
          title="편집"
        >
          <Image src={EditIcon} alt="edit" />
        </button>

        {/* 삭제 버튼 */}
        <button
          onClick={() => onDelete(category.id)}
          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
          title="삭제"
        >
          <Image src={DeleteIcon} alt="delete" />
        </button>
      </div>
    </div>
  );
}

// 드래그 오버레이 컴포넌트
function DragOverlayItem({ category }: { category: CategoryItem }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
      <div className="h-6 w-6" />

      <div className="flex flex-col gap-1 text-gray-400">
        <Image src={DragIcon} alt="drag" />
      </div>

      <div className="flex-1">
        <span className="font-medium text-gray-900">{category.name}</span>
      </div>

      <div className="flex items-center gap-2 opacity-50">
        <button className="rounded-lg p-2 text-gray-500" disabled>
          <Image src={EditIcon} alt="edit" />
        </button>
        <button className="rounded-lg p-2 text-gray-500" disabled>
          <Image src={DeleteIcon} alt="delete" />
        </button>
      </div>
    </div>
  );
}

function flattenCategories(categories: CategoryItem[]): CategoryItem[] {
  const result: CategoryItem[] = [];

  function traverse(items: CategoryItem[], depth: number = 0) {
    items.forEach((item) => {
      result.push({ ...item, depth });
      if (item.isExpanded && item.children && item.children.length > 0) {
        traverse(item.children, depth + 1);
      }
    });
  }

  traverse(categories);
  return result;
}

export default function MenuCategoryPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([
    {
      id: '1',
      name: '시그니처 안주',
      order: 1,
      isExpanded: false,
      children: [
        { id: '2', name: '참소라 무침', order: 2, parentId: '1' },
        { id: '3', name: '감자전', order: 3, parentId: '1' },
        { id: '4', name: '감자전', order: 4, parentId: '1' },
        { id: '5', name: '감자전', order: 5, parentId: '1' },
        { id: '6', name: '감자전', order: 6, parentId: '1' },
      ],
    },
    {
      id: '7',
      name: '상현 메이드 안주',
      order: 7,
      isExpanded: false,
      children: [
        { id: '2', name: '참소라 무침', order: 2, parentId: '1' },
        { id: '3', name: '감자전', order: 3, parentId: '1' },
      ],
    },
  ]);

  const [activeId, setActiveId] = useState<string | null>(null);

  // 센서 설정
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // 카테고리 펼치기/접기 토글
  const toggleCategory = (categoryId: string) => {
    setCategories((prevCategories) => {
      return prevCategories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            isExpanded: !category.isExpanded,
          };
        }
        return category;
      });
    });
  };

  // 드래그 시작 핸들러
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  // 드래그 종료 핸들러
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const flatItems = flattenCategories(categories);
      const oldIndex = flatItems.findIndex((item) => item.id === active.id);
      const newIndex = flatItems.findIndex((item) => item.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newFlatItems = arrayMove(flatItems, oldIndex, newIndex);

        // 플랫 리스트를 다시 계층 구조로 변환
        const newCategories = rebuildHierarchy(newFlatItems);
        setCategories(newCategories);
      }
    }

    setActiveId(null);
  };

  // 플랫 리스트를 계층 구조로 재구성하는 함수
  const rebuildHierarchy = (flatItems: CategoryItem[]): CategoryItem[] => {
    const topLevel: CategoryItem[] = [];
    const itemMap = new Map<string, CategoryItem>();

    // 모든 아이템을 맵에 저장하고 children 배열 초기화
    flatItems.forEach((item) => {
      itemMap.set(item.id, { ...item, children: [] });
    });

    // 계층 구조 재구성
    flatItems.forEach((item) => {
      const categoryItem = itemMap.get(item.id)!;
      if (item.parentId) {
        const parent = itemMap.get(item.parentId);
        if (parent) {
          parent.children!.push(categoryItem);
        }
      } else {
        topLevel.push(categoryItem);
      }
    });

    return topLevel;
  };

  // 편집 버튼 클릭
  const handleEdit = (categoryId: string) => {
    console.log('Edit category:', categoryId);
    // 편집 로직 구현
  };

  // 삭제 버튼 클릭
  const handleDelete = (categoryId: string) => {
    setCategories((prevCategories) => {
      return prevCategories.filter((category) => {
        if (category.id === categoryId) return false;
        if (category.children) {
          category.children = category.children.filter(
            (child) => child.id !== categoryId,
          );
        }
        return true;
      });
    });
  };

  // 저장 버튼 클릭
  const handleSave = () => {
    console.log('Save order:', categories);
    // 저장 로직 구현
  };

  // 취소 버튼 클릭
  const handleCancel = () => {
    console.log('Cancel');
    // 취소 로직 구현
  };

  // 현재 드래그 중인 아이템 찾기
  const activeCategory = activeId
    ? flattenCategories(categories).find((category) => category.id === activeId)
    : null;

  // 렌더링할 플랫 리스트 생성
  const flatCategoriesForRender = flattenCategories(categories);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="wrapper flex w-full items-center justify-center py-4">
        <div className="grow-1 text-mobile-head-l-semibold flex">
          순서·카테고리 편집
        </div>
        <SaveButton
          text="변경사항 저장하기"
          color="gray"
          width="fit"
          size="medium"
        />
      </div>

      <div className="w-full border-b border-gray-100" />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* 카테고리 리스트 */}
        <div className="wrapper w-full p-4">
          <SortableContext
            items={flatCategoriesForRender.map((category) => category.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {flatCategoriesForRender.map((category) => (
                <SortableCategoryItem
                  key={category.id}
                  category={category}
                  depth={(category as any).depth || 0}
                  isChild={!!category.parentId}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggle={toggleCategory}
                />
              ))}
            </div>
          </SortableContext>
        </div>

        {/* 드래그 오버레이 */}
        <DragOverlay>
          {activeCategory && <DragOverlayItem category={activeCategory} />}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
