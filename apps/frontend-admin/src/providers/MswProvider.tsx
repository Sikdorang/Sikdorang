'use client';

import { useEffect } from 'react';

export default function MswProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (process.env.NEXT_PUBLIC_API_MOCKING !== 'enable') {
      return;
    }

    import('../mocks/browser').then(({ worker }) => {
      worker.start();
    });
  }, []);

  return <>{children}</>;
}
