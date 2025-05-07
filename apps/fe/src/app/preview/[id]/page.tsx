'use client';

import MenuModal from '@/components/pages/preview/MenuModal';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  //const menuId = params.id;

  const handleClose = () => {
    router.back();
  };

  return (
    <div onClick={handleClose} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <MenuModal
        item={{
          id: 8,
          menu: '파스타',
          images: [
            '/images/jiwhaja_dish_1.png',
            '/images/jiwhaja_dish_2.png',
            '/images/jiwhaja_dish_3.png',
            '/images/jiwhaja_dish_4.png',
          ],
          tags: ['어쩌고', '어쩌고'],
          details: '부드러운 크림 파스타',
          price: 13000,
          status: false,
        }}
        onClose={handleClose}
      />
    </div>
  );
}
