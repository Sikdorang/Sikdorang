import { PropsWithChildren } from 'react';

export default function SidebarWithContentContainer({ children }: PropsWithChildren) {
  return <div className="wrapper mx-auto flex gap-4 sm:gap-6 lg:gap-10 m-12">{children}</div>;
}
