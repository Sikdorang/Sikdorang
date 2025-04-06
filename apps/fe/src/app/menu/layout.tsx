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
      {modifyModal}
      {deleteModal}
      <div>{children}</div>
    </div>
  );
}
