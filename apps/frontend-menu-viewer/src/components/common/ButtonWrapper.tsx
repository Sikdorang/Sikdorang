import type { PropsWithChildren } from 'react';

export default function ButtonWrapper({ children }: PropsWithChildren) {
  return (
    <div className="animate-button-in wrapper fixed bottom-0 left-0 right-0 w-full bg-gradient-to-t from-white to-white/0 pb-7 pt-2">
      {children}
    </div>
  );
}
