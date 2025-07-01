'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

// 아이콘 예시 (실제 프로젝트에서는 별도 컴포넌트로 분리 가능)
const icons = {
  menu: (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  flag: (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="M4 4h16v16H4z" />
    </svg>
  ),
  utensils: (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="M8 7v10M16 7v10M12 3v18" />
    </svg>
  ),
  store: (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
  dashboard: (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </svg>
  ),
  settings: (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 8.6 15a1.65 1.65 0 0 0-1.82-.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0 .33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 15 8.6a1.65 1.65 0 0 0 1.82.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 15z" />
    </svg>
  ),
  logout: (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
    </svg>
  ),
};

export default function NavigationBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(true);

  // 메뉴 구조 정의
  const menuSections = [
    {
      label: '메뉴 관리',
      icon: icons.menu,
      children: [
        {
          name: '메뉴 편집',
          path: '/menu/edit',
          active: pathname === '/menu/edit',
          highlight: true,
        },
        {
          name: '순서·카테고리 편집',
          path: '/menu/category',
          active: pathname === '/menu/category',
        },
      ],
      open: true,
    },
    {
      items: [
        {
          icon: icons.flag,
          name: '추천 관리',
          path: '/recommend',
          active: pathname === '/recommend',
        },
        {
          icon: icons.utensils,
          name: '내 메뉴판 보기',
          path: '/menu/preview',
          active: pathname === '/menu/preview',
        },
        {
          icon: icons.store,
          name: '매장 정보 관리',
          path: '/store',
          active: pathname === '/store',
        },
        {
          icon: icons.dashboard,
          name: '대시보드',
          path: '/dashboard',
          active: pathname === '/dashboard',
        },
      ],
    },
    {
      items: [
        {
          icon: icons.settings,
          name: '설정',
          path: '/settings',
          active: pathname === '/settings',
        },
        {
          icon: icons.logout,
          name: '로그아웃',
          path: '/logout',
          active: false,
        },
      ],
      bottom: true,
    },
  ];

  return (
    <aside className="flex h-screen w-[240px] flex-col justify-between bg-[#171929] px-0 py-6">
      <div>
        {/* 메뉴 관리 섹션 */}
        <div className="px-4">
          <button
            className="text-mobile-body-l-semibold text-main-500 flex w-full items-center gap-2 focus:outline-none"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {icons.menu}
            <span>메뉴 관리</span>
            <svg
              className={`ml-auto h-4 w-4 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {menuOpen && (
            <div className="mt-2 flex flex-col gap-1">
              <Link
                href="/menu/edit"
                className={`text-mobile-body-m-semibold rounded-lg py-3 text-left ${
                  pathname === '/menu/edit'
                    ? 'bg-main-500 text-bk'
                    : 'text-main-500 hover:bg-main-500/20'
                } px-4 transition-colors`}
              >
                메뉴 편집
              </Link>
              <Link
                href="/menu/category"
                className={`text-mobile-body-m-semibold rounded-lg py-3 text-left ${
                  pathname === '/menu/category'
                    ? 'text-main-500'
                    : 'hover:bg-main-500/10 text-gray-100'
                } px-4 transition-colors`}
              >
                순서·카테고리 편집
              </Link>
            </div>
          )}
        </div>
        {/* 일반 메뉴 */}
        <nav className="mt-6 flex flex-col gap-2">
          <Link
            href="/recommend"
            className={`text-mobile-body-m-semibold flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${
              pathname === '/recommend'
                ? 'text-main-500'
                : 'hover:bg-main-500/10 text-gray-100'
            }`}
          >
            {icons.flag}
            <span>추천 관리</span>
          </Link>
          <Link
            href="/menu/preview"
            className={`text-mobile-body-m-semibold flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${
              pathname === '/menu/preview'
                ? 'text-main-500'
                : 'hover:bg-main-500/10 text-gray-100'
            }`}
          >
            {icons.utensils}
            <span>내 메뉴판 보기</span>
          </Link>
          <Link
            href="/store"
            className={`text-mobile-body-m-semibold flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${
              pathname === '/store'
                ? 'text-main-500'
                : 'hover:bg-main-500/10 text-gray-100'
            }`}
          >
            {icons.store}
            <span>매장 정보 관리</span>
          </Link>
          <Link
            href="/dashboard"
            className={`text-mobile-body-m-semibold flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${
              pathname === '/dashboard'
                ? 'text-main-500'
                : 'hover:bg-main-500/10 text-gray-100'
            }`}
          >
            {icons.dashboard}
            <span>대시보드</span>
          </Link>
        </nav>
      </div>
      {/* 하단 메뉴 */}
      <div className="flex flex-col gap-2 px-4">
        <Link
          href="/settings"
          className="text-mobile-body-m-semibold hover:text-main-500 flex items-center gap-3 px-2 py-2 text-gray-100 transition-colors"
        >
          {icons.settings}
          <span>설정</span>
        </Link>
        <Link
          href="/logout"
          className="text-mobile-body-m-semibold hover:text-main-500 flex items-center gap-3 px-2 py-2 text-gray-100 transition-colors"
        >
          {icons.logout}
          <span>로그아웃</span>
        </Link>
      </div>
    </aside>
  );
}
