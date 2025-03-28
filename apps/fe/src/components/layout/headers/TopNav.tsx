'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import profileBackgroundImage from '../../../../public/icons/ic_circle.svg';

const navItems = [
  { name: '메뉴', path: '/menu' },
  { name: '이벤트', path: '/events' },
  { name: '메뉴판 편집', path: '/preview' },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white fixed top-0 left-0 w-full z-1000 border border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-title-sm text-gray-800">
          <Link href="/">식도랑 관리자</Link>
        </div>
        <div className="flex space-x-4">
          <ul className="flex space-x-4 items-center">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`px-3 text-label-md focus:outline-none transition ${
                    pathname === item.path ? 'text-blue-500' : 'text-gray-700 hover:text-blue-400'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <Image src={profileBackgroundImage} className="space-x-4 w-[29px] h-[29px]" alt={''} />
          </ul>
        </div>
      </div>
    </nav>
  );
}
