'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default function ModalBackground({ children }: PropsWithChildren) {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  return (
    <div onClick={handleClose} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      {children}
    </div>
  );
}
