import { type PropsWithChildren } from 'react';

export default function BaseResponsiveLayout({ children }: PropsWithChildren) {
  return <div className="min-w-xs mx-auto w-full min-h-screen">{children}</div>;
}
