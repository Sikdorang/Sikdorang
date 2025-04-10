import { PropsWithChildren } from 'react';

export default function CategorySidebar({ children }: PropsWithChildren) {
  return (
    <aside className="sticky top-16 h-screen overflow-y-auto w-full max-w-36 sm:max-w-40 lg:max-w-48 transition-[max-width] duration-300 ease-in-out scroll-hide">
      {children}
    </aside>
  );
}
