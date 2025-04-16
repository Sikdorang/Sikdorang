import { Suspense } from 'react';

export default function MenuLayout({
  children,
  modifyModal,
  deleteModal,
}: {
  children: React.ReactNode;
  modifyModal: React.ReactNode;
  deleteModal: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Suspense fallback={<div />}>{modifyModal}</Suspense>
      <Suspense fallback={<div />}>{deleteModal}</Suspense>
      <div>{children}</div>
    </div>
  );
}
