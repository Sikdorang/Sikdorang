interface TextSkeletonProps {
  lines?: number;
  className?: string;
}

export default function TextSkeleton({ lines = 1, className = '' }: TextSkeletonProps) {
  return (
    <div className={`space-y-2 animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`h-4 bg-gray-200 rounded ${i === lines - 1 ? 'w-5/6' : 'w-full'}`} />
      ))}
    </div>
  );
}
