interface MenuTableRowSkeletonProps {
  idx: number;
}

export default function MenuTableRowSkeleton({
  idx,
}: MenuTableRowSkeletonProps) {
  return (
    <tr key={idx} className="animate-pulse">
      <td className="border-b border-l border-t border-gray-300 pl-6 py-5">
        <div className="h-6 w-6 rounded bg-gray-200" />
      </td>
      <td className="border-b border-t border-gray-300 px-5 py-5">
        <div className="h-4 w-32 rounded bg-gray-200" />
      </td>
      <td className="border-b border-t border-gray-300 px-5 py-5">
        <div className="h-4 w-16 rounded bg-gray-200" />
      </td>
      <td className="border-b border-t border-gray-300 px-5 py-5">
        <div className="h-4 w-20 rounded-xl bg-gray-200" />
      </td>
      <td className="border-b border-t border-gray-300 px-5 py-5">
        <div className="h-4 w-14 rounded-xl bg-gray-200" />
      </td>
      <td className="border-b border-r border-t border-gray-300 px-5 py-5 text-center">
        <div className="h-8 w-16 rounded bg-gray-200" />
      </td>
    </tr>
  );
}
