import '../styles/global.css';
import MswProvider from '@/mocks/MswProvider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sikdorang Admin',
  description: 'Sikdorang Admin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="custom-scrollbar">
      <body>
        <MswProvider>{children}</MswProvider>
      </body>
    </html>
  );
}
