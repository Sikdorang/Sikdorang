'use client';

import MenuModal from '@/components/pages/preview/MenuModal';
import ModalBackground from '@/components/pages/preview/ModalBackground';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ModalPage() {
  // const menuId = params.id;
  const router = useRouter();
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  //const menuId = params.id;

  const handleClose = () => {
    router.back();
  };

  return (
    <ModalBackground>
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
    </ModalBackground>
  );
}
