import { EditModalProvider } from '@/contexts/EditModalContext';
import { Suspense } from 'react';

export default function MenuEditLayout({
  children,
  modifyModal,
}: {
  children: React.ReactNode;
  modifyModal: React.ReactNode;
}) {
  return (
    <div className="relative">
      <EditModalProvider>
        <Suspense fallback={<div />}>{modifyModal}</Suspense>
        <div>{children}</div>
      </EditModalProvider>
    </div>
  );
}
