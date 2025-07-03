'use client';

import TopNav from '@/components/layout/headers/NavigationBar';
import SideBar from '@/components/layout/siders/NavigationBar';
import { useState } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <aside
        className={`bg-gray-900 text-white transition-all duration-300 ${
          collapsed ? 'w-[72px]' : 'w-[240px]'
        }`}
      >
        <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      </aside>

      <div className="flex flex-1 flex-col bg-white">
        <TopNav />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
