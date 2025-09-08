import MswProvider from '@/providers/MswProvider';
import ToastProvider from '@/providers/toastProvider';
import '@/styles/global.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '식도랑 관리자',
  description: '식도랑 관리자',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="custom-scrollbar">
      <body>
        <ToastProvider>
          <MswProvider>{children}</MswProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
