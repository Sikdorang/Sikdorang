'use client';

import { ReactNode, useEffect } from 'react';

export function MSWProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    async function enableMocking() {
      if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_MOCKING === 'enable') {
        const { worker } = await import('../mocks/browser'); // 브라우저 환경에서만 동적 임포트
        await worker.start();
        console.log('MSW Worker started');
      }
    }
    enableMocking();
  }, []);

  return <>{children}</>;
}
