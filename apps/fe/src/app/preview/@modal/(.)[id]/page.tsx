'use client';

import MenuModal from '@/components/pages/preview/MenuModal';
import ModalBackground from '@/components/pages/preview/ModalBackground';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

interface ModalPageProps {
  params: { id: string };
}

export default function ModalPage({ params }: ModalPageProps) {
  const menuId = params.id;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <ModalBackground>
      <MenuModal
        item={{
          id: 8,
          name: '파스타',
          images: ['/images/jiwhaja_dish_2.png', '/images/jiwhaja_dish_1.png', '/images/jiwhaja_dish_2.png'],
          tags: ['어쩌고', '어쩌고 갑니다 태그 긴 거', '어쩌고', '어쩌고 태그 입니다', '어쩌고'],
          description: '부드러운 크림 파스타',
          price: 13000,
          status: false,
        }}
        onClose={() => {}}
      />
    </ModalBackground>
  );
}
