'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function DeleteMenuModal() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryId = searchParams.get('id');
  const queryName = searchParams.get('name');

  const handleDelete = () => {
    console.log(`메뉴 ID ${queryId}과 ${queryName} 삭제`);
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.back();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-sm shadow-lg w-[400px]">
        <h2 className="text-title-sm text-gray-800 mb-4">메뉴 삭제</h2>
        <p className="text-body-md-m text-gray-600 mb-6">{queryName} 메뉴를 삭제하시겠어요?</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleCancel}
            className="flex-1 w-full px-4 py-2 bg-gray-100 text-label-md text-gray-500 rounded hover:bg-gray-200"
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
