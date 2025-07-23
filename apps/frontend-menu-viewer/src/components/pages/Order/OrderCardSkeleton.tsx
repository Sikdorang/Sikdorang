import TextSkeleton from '@/components/common/TextSkeleton';

export default function OrderCardSkeleton() {
  return (
    <li className="border border-gray-200 rounded-2xl overflow-hidden">
      <div className="bg-gray-800 flex items-center justify-between h-12 px-4">
        <TextSkeleton />
        <TextSkeleton width="min-w-20" />
      </div>
      <div className="p-4 flex flex-col gap-3">
        <ul className="flex flex-col gap-6">
          {Array.from({ length: 2 }).map((_, index) => (
            <li key={index}>
              <div className="flex justify-between items-start gap-6">
                <TextSkeleton height="h-6 w-40" />
                <div className="flex flex-col justify-end gap-1">
                  <TextSkeleton width="w-20" />
                  <TextSkeleton width="w-10" directionClass="items-end" />
                </div>
              </div>
              <ul className="flex flex-col gap-1 mt-1">
                {Array.from({ length: 2 }).map((_, idx) => (
                  <TextSkeleton key={idx} width="w-2/3 h-3" />
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <hr className="border-gray-200" />
        <TextSkeleton width="w-40" directionClass="items-end" />
        <button
          disabled
          className="disabled:text-gray-400 text-mb-5 text-gray-700 bg-gray-100 rounded-2xl h-11"
        >
          같은 메뉴 주문하기
        </button>
      </div>
    </li>
  );
}
