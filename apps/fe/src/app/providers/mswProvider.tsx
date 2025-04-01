'use client';

import { useEffect } from 'react';

export default function MSWProvider() {
  useEffect(() => {
    async function enableMocking() {
      if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_MOCKING === 'enable') {
        const { worker } = await import('../../mocks/browser'); // 브라우저 환경에서만 동적 임포트
        await worker.start();
        console.log('MSW Worker started');
      }
    }
    enableMocking();
  }, []);

  return null;
}
