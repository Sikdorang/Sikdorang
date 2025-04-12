interface TextSkeletonProps {
  lines?: number;
  lastLineWidthPercent?: number;
}

export default function TextSkeleton({ lines = 1, lastLineWidthPercent = 0.8 }: TextSkeletonProps) {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 rounded"
          style={{ width: i === lines - 1 ? `${lastLineWidthPercent * 100}%` : '100%' }}
        />
      ))}
    </div>
  );
}
