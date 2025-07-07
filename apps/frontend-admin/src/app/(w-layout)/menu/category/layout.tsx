import { MenuModalProvider } from '@/contexts/NameEditModalContext';
import { WarningModalProvider } from '@/contexts/WarningModalContext';

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
  modifyModal: React.ReactNode;
}) {
  return (
    <div className="relative">
      <MenuModalProvider>
        <WarningModalProvider>
          <div>{children}</div>
        </WarningModalProvider>
      </MenuModalProvider>
    </div>
  );
}
