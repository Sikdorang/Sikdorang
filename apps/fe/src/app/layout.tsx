import type { Metadata } from 'next';
import localFont from 'next/font/local';

import '../styles/globals.css';
import TanstackProvider from '@/providers/tanstackProvider';
import ToastProvider from '@/providers/toastProvider';
import MSWProvider from '@/providers/mswProvider';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '식도랑',
  description: '고민은 줄이고, 선택은 쉽게. 술자리 주문을 도와주는 메뉴판',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.className} antialiased`}>
        <TanstackProvider>
          <ToastProvider>
            {children}
            <MSWProvider />
          </ToastProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
