'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import ProfileImage from '@public/icons/ic_circle.svg';

const navItems = [
  { name: '메뉴', path: '/menu' },
  { name: '이벤트', path: '/events' },
  { name: '메뉴 순서 편집', path: '/edit' },
  { name: '손님용으로 전환', path: '/preview' },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white sticky inset-0 w-full z-10 border-b border-gray-200">
      <div className="wrapper mx-auto py-4 flex items-center justify-between">
        <div className="text-title-sm text-gray-800">
          <Link href="/">식도랑 관리자</Link>
        </div>
        <div className="flex space-x-4">
          <ul className="flex space-x-4 items-center">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`px-3 text-label-md focus:outline-none transition-colors ${
                    pathname === item.path ? 'text-blue-500' : 'text-gray-700 hover:text-blue-400'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <ProfileImage />
          </ul>
        </div>
      </div>
    </nav>
  );
}
