'use client';

import { useEffect } from 'react';

export default function MswProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    import('../mocks/browser').then(({ worker }) => {
      worker.start();
      console.log('start msw');
    });
  }, []);

  return <>{children}</>;
}
