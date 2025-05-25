import { Suspense } from 'react';

export default function MenuLayout({
  children,
  modifyModal,
}: {
  children: React.ReactNode;
  modifyModal: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Suspense fallback={<div />}>{modifyModal}</Suspense>
      <div>{children}</div>
    </div>
  );
}
