import { PropsWithChildren } from 'react';

export default function MenuSection({ children }: PropsWithChildren) {
  return <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">{children}</main>;
}
