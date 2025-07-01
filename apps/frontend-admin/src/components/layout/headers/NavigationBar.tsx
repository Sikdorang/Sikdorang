'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: '메뉴', path: '/menu' },
  // { name: '이벤트', path: '/events' },
  { name: '메뉴 순서 편집', path: '/edit' },
  { name: '손님용으로 전환', path: '/preview' },
  { name: '마이페이지', path: '/mypage' },
];

export default function NavigationBar() {
  const pathname = usePathname();

  return (
    <nav className="sticky inset-0 z-10 w-full border-b border-gray-200 bg-white">
      <div className="wrapper mx-auto flex items-center justify-between py-4">
        <div className="text-title-sm text-gray-800">
          <Link href="/">식도랑 관리자</Link>
        </div>
        <div className="flex space-x-4">
          <ul className="flex items-center space-x-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`text-label-md px-3 transition-colors focus:outline-none ${
                    pathname === item.path
                      ? 'text-blue-500'
                      : 'text-gray-700 hover:text-blue-400'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
