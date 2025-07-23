'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 상위 카테고리와 하위 탭 정의
const NAV_STRUCTURE = [
  {
    key: 'menu',
    label: '메뉴 관리',
    basePath: '/menu',
    tabs: [
      { name: '메뉴편집', href: '/menu/edit' },
      { name: '순서·카테고리 편집', href: '/menu/category' },
    ],
  },
  {
    key: 'recommend',
    label: '추천 관리',
    basePath: '/recommend',
    tabs: [
      { name: '추천목록', href: '/recommend/list' },
      { name: '추천설정', href: '/recommend/settings' },
    ],
  },
  {
    key: 'preview',
    label: '내 메뉴판 보기',
    basePath: '/preview',
    tabs: [{ name: '내 메뉴판 보기', href: '/preview' }],
  },
  {
    key: 'shop',
    label: '매장 정보 관리',
    basePath: '/shop',
    tabs: [],
  },
  {
    key: 'dashboard',
    label: '대시보드',
    basePath: '/dashboard',
    tabs: [{ name: '대시보드', href: '/dashboard' }],
  },
  {
    key: 'settings',
    label: '설정',
    basePath: '/settings',
    tabs: [{ name: '설정', href: '/settings' }],
  },
];

function getActiveCategory(pathname: string) {
  return (
    NAV_STRUCTURE.find(
      (cat) =>
        pathname === cat.basePath || pathname.startsWith(cat.basePath + '/'),
    ) || NAV_STRUCTURE[0]
  );
}

export default function TopNavigationBar() {
  const pathname = usePathname();
  const activeCategory = getActiveCategory(pathname);

  return (
    <header className="flex items-center justify-between border-t border-gray-200 bg-white px-12 py-8">
      <h2 className="text-desktop-head-s-semibold text-bk">
        {activeCategory.label}
      </h2>

      <nav className="flex items-center gap-6">
        {activeCategory.tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={
              (pathname === tab.href
                ? 'text-main-500 font-semibold'
                : 'font-medium text-gray-400') +
              ' text-mobile-body-m-semibold transition-colors'
            }
          >
            {tab.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
