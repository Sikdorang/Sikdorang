export default function Layout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="fixed inset-0 z-50 mt-40 bg-black/50">{modal}</div>
    </>
  );
}
