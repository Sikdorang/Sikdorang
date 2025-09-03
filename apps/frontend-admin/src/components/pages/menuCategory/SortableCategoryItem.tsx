import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ChevronDownIcon from '@public/icons/ic_chevron_down.svg';
import ChevronRightIcon from '@public/icons/ic_chevron_right.svg';
import DragIcon from '@public/icons/ic_dots.svg';
import EditIcon from '@public/icons/ic_pencil.svg';
import DeleteIcon from '@public/icons/ic_trashcan.svg';

interface SortableCategoryItemProps {
  category: CategoryItem;
  depth: number;
  onEdit: (categoryId: number) => void;
  onDelete: (categoryId: number) => void;
  onToggle: (categoryId: number) => void;
  isChild?: boolean;
}

interface CategoryItem {
  id: number;
  name: string;
  order?: number;
  parentId?: number | null;
  children?: CategoryItem[];
  isExpanded?: boolean;
}

export default function SortableCategoryItem({
  category,
  depth = 0,
  onEdit,
  onDelete,
  onToggle,
  isChild = false,
}: SortableCategoryItemProps) {
  const key =
    category.parentId != null
      ? `cat-${category.parentId}-item-${category.id}`
      : `cat-${category.id}`;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: key,
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
      className={`flex items-center gap-3 border-b border-gray-200 bg-white p-4 transition-all duration-200 ${isDragging ? 'z-50 shadow-lg' : 'hover:border-gray-300 hover:shadow-md'} ${isChild ? 'ml-6 bg-gray-50' : ''} `}
      style={{ ...style, paddingLeft: `${paddingLeft}px` }}
    >
      <div
        {...attributes}
        {...listeners}
        className="flex cursor-grab touch-none flex-col gap-1 px-4 text-gray-400 active:cursor-grabbing"
        aria-label="드래그 핸들"
      >
        <DragIcon />
      </div>

      {hasChildren && (
        <button
          onClick={() => onToggle(category.id)}
          className="flex h-6 w-6 items-center justify-center rounded text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          aria-label={category.isExpanded ? '접기' : '펼치기'}
        >
          {category.isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </button>
      )}

      <div className="flex-1">
        <span className={`text-mb-1 text-gray-900`}>{category.name}</span>
        {hasChildren && (
          <span className="ml-2 text-mb-1 text-gray-500">
            {category.children?.length}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(category.id)}
          className="rounded-lg p-2 bg-gray-100 text-gray-500 transition-colors hover:bg-gray-300"
          title="편집"
        >
          <EditIcon />
        </button>

        <button
          onClick={() => onDelete(category.id)}
          className="rounded-lg p-2 bg-red-200 text-gray-500 transition-colors hover:bg-red-300"
          title="삭제"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}
