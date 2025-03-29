import MenuModal from '@/components/preview/MenuModal';

interface ModalPageProps {
  params: Promise<{ id: string }>;
}

export default async function ModalPage({ params }: ModalPageProps) {
  const menuId = (await params).id;
  return <MenuModal id={menuId} />;
}
