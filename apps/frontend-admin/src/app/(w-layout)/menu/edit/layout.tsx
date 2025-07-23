import { EditModalProvider } from '@/contexts/EditModalContext';
import { WarningModalProvider } from '@/contexts/WarningModalContext';

export default function MenuEditLayout({
  children,
}: {
  children: React.ReactNode;
  modifyModal: React.ReactNode;
}) {
  return (
    <div className="relative">
      <EditModalProvider>
        <WarningModalProvider>
          <div>{children}</div>
        </WarningModalProvider>
      </EditModalProvider>
    </div>
  );
}
