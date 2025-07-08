import { EditModalProvider } from '@/contexts/EditModalContext';

export default function MenuEditLayout({
  children,
}: {
  children: React.ReactNode;
  modifyModal: React.ReactNode;
}) {
  return (
    <div className="relative">
      <EditModalProvider>
        <div>{children}</div>
      </EditModalProvider>
    </div>
  );
}
