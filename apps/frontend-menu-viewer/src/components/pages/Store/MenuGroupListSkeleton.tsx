import MenuGroupSkeleton from './MenuGroupSkeleton';
import Divider from '@/components/common/Divider';

export default function MenuGroupListSkeleton() {
  const dummyArray = Array.from({ length: 4 });
  return (
    <ul>
      {dummyArray.map((_, idx) => (
        <div>
          <MenuGroupSkeleton />
          {idx < dummyArray.length - 1 && (
            <div className="xl:mx-auto xl:max-w-5xl">
              <Divider />
            </div>
          )}
        </div>
      ))}
    </ul>
  );
}
