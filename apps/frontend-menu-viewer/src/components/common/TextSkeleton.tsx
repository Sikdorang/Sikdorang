interface TextSkeletonProps {
  lines?: number;
  width?: string;
  height?: string;
  directionClass?: string;
}

export default function TextSkeleton({
  lines = 1,
  width = 'min-w-10',
  height = 'h-5',
  directionClass = '',
}: TextSkeletonProps) {
  return (
    <div className={`space-y-2 flex flex-col animate-pulse ${directionClass}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`${width} ${height} bg-gray-100 rounded-2xl`} />
      ))}
    </div>
  );
}
