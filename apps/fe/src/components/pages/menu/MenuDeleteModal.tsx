import React from 'react';

interface DeleteMenuModalProps {
  id: number;
  name?: string;
  onDelete: (id: number) => void;
  onCancel: () => void;
}

export default function DeleteMenuModal({ id, name, onDelete, onCancel }: DeleteMenuModalProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  const handleDelete = () => {
    onDelete(id);
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-sm shadow-lg w-[400px]">
        <h2 className="text-title-sm text-gray-800 mb-4">메뉴 삭제</h2>
        <p className="text-body-md-m text-gray-600 mb-6">{name} 메뉴를 삭제하시겠어요?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="flex-1 w-full px-4 py-4 bg-gray-100 text-label-md text-gray-500 rounded hover:bg-gray-200"
          >
            취소
          </button>
          <button
            onClick={handleDelete}
            className="flex-2 w-full px-4 py-2 bg-red-500 text-label-md text-white rounded hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
