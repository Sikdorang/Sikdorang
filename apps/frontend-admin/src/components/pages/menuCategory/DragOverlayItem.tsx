import DragIcon from '@public/icons/ic_dots.svg';
import EditIcon from '@public/icons/ic_pencil.svg';
import DeleteIcon from '@public/icons/ic_trashcan.svg';

interface CategoryItem {
  id: number;
  name: string;
  order?: number;
  parentId?: number | null;
  children?: CategoryItem[];
  isExpanded?: boolean;
  depth?: number;
}

export default function DragOverlayItem({
  category,
}: {
  category: CategoryItem;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
      <div className="h-6 w-6" />

      <div className="flex flex-col gap-1 text-gray-400">
        <DragIcon />
      </div>

      <div className="flex-1">
        <span className="font-medium text-gray-900">{category.name}</span>
      </div>

      <div className="flex items-center gap-2 opacity-50">
        <button className="rounded-lg p-2 text-gray-500" disabled>
          <EditIcon />
        </button>
        <button className="rounded-lg p-2 text-gray-500" disabled>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}
