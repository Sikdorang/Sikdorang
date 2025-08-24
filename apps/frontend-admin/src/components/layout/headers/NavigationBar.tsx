'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
    tabs: [],
  },
  {
    key: 'preview',
    label: '내 메뉴판 보기',
    basePath: '/preview',
    tabs: [],
  },
  {
    key: 'shop',
    label: '매장 정보 관리',
    basePath: '/shop',
    tabs: [],
  },
  {
    key: 'editShop',
    label: '매장 정보 가이드 수정',
    basePath: '/shop/edit',
    tabs: [],
  },
  {
    key: 'dashboard',
    label: '대시보드',
    basePath: '/dashboard',
    tabs: [],
  },
  {
    key: 'settings',
    label: '설정',
    basePath: '/settings',
    tabs: [],
  },
  {
    key: 'order',
    label: '주문 현황',
    basePath: '/order',
    tabs: [],
  },
  {
    key: 'link',
    label: '테이블 연동',
    basePath: '/link',
    tabs: [],
  },
  {
    key: 'history',
    label: '주문 내역',
    basePath: '/history',
    tabs: [],
  },
];

function getActiveCategory(pathname: string) {
  const exact = NAV_STRUCTURE.find((cat) => pathname === cat.basePath);
  if (exact) return exact;
  return (
    NAV_STRUCTURE.find((cat) => pathname.startsWith(cat.basePath + '/')) ||
    NAV_STRUCTURE[0]
  );
}

export default function TopNavigationBar() {
  const pathname = usePathname();
  const activeCategory = getActiveCategory(pathname);

  return (
    <header className="flex items-center justify-between border-t border-gray-200 bg-white px-12 py-8">
      <h2 className="text-dh-1 text-bk">{activeCategory.label}</h2>

      <nav className="flex items-center gap-6">
        {activeCategory.tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={
              (pathname === tab.href
                ? 'text-main-500 text-mb-1'
                : 'text-gray-400') + ' text-mb-1 transition-colors'
            }
          >
            {tab.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
