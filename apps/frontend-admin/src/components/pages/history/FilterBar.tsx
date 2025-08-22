'use client';

import { Dispatch, SetStateAction } from 'react';

interface FilterBarProps {
  status: string;
  startDate: string;
  sort: string;
  setStatus: Dispatch<SetStateAction<string>>;
  setStartDate: Dispatch<SetStateAction<string>>;
  setSort: Dispatch<SetStateAction<string>>;
}

export default function FilterBar({
  status,
  startDate,
  sort,
  setStatus,
  setStartDate,
  setSort,
}: FilterBarProps) {
  return (
    <div className="flex justify-between bg-gray-100 rounded-xl p-12 flex gap-4 items-end">
      {/* 주문 상태 */}
      <div>
        <label className="block text-gray-700 mb-1">주문 상태</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-40 px-3 py-2 border rounded"
        >
          <option value="all">전체</option>
          <option value="pending">대기</option>
          <option value="processing">처리 중</option>
          <option value="completed">완료</option>
        </select>
      </div>

      {/* 검색 시작일 */}
      <div>
        <label className="block text-gray-700 mb-1">검색 시작일</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-48 px-3 py-2 border rounded"
        />
      </div>

      {/* 정렬 순서 */}
      <div>
        <label className="block text-gray-700 mb-1">정렬 순서</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-40 px-3 py-2 border rounded"
        >
          <option value="newest">최신 순</option>
          <option value="oldest">오래된 순</option>
        </select>
      </div>
    </div>
  );
}
