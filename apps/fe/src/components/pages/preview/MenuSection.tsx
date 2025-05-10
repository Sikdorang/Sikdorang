import { PropsWithChildren } from 'react';

export default function MenuSection({ children }: PropsWithChildren) {
  return (
    <main className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 flex-1">{children}</main>
  );
}
