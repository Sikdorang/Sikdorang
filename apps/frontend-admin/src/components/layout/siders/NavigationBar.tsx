'use client';

import NavigationSwitch from '@/components/common/buttons/NavigationSwitch';
import ChevronDownIcon from '@public/icons/ic_chevron_down.svg';
import SettingIcon from '@public/icons/ic_cogwheel.svg';
import RecommandManagementIcon from '@public/icons/ic_flag.svg';
import PreviewMenuIcon from '@public/icons/ic_flatware.svg';
import DashboardIcon from '@public/icons/ic_histogram.svg';
import MenuManagementIcon from '@public/icons/ic_paper.svg';
import TableLinkIcon from '@public/icons/ic_qr_code.svg';
import CollapsingIcon from '@public/icons/ic_screen.svg';
import ShopManagementIcon from '@public/icons/ic_shop.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface NavigationBarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

export default function NavigationBar({
  collapsed,
  setCollapsed,
}: NavigationBarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(true);
  const [navigationType, setNavigationType] = useState(true);

  return (
    <aside
      className={`flex h-screen flex-col justify-between bg-gray-900 px-0 py-6 transition-all duration-300 ${
        collapsed ? 'w-[72px]' : 'w-[240px]'
      }`}
    >
      <div>
        <nav
          className={`mb-8 flex items-center px-4 ${collapsed ? 'justify-center' : 'justify-end'}`}
        >
          <button
            aria-label="최소화"
            onClick={() => setCollapsed(!collapsed)}
            className="hover:text-main-500 text-gray-400 transition-colors"
          >
            <CollapsingIcon width={20} height={20} />
          </button>
        </nav>

        {!collapsed ? (
          <nav className={`mb-4 flex items-center w-full justify-center`}>
            <NavigationSwitch
              isOn={navigationType}
              onToggle={() => {
                setNavigationType(!navigationType);
              }}
              leftLabel="메뉴판"
              rightLabel="주문 내역"
            />
          </nav>
        ) : undefined}
        {navigationType ? (
          <nav className="mt-6 flex flex-col gap-8">
            <div>
              <Link
                href="/menu/edit"
                className={`text-mb-3 flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${
                  pathname === '/menu/edit'
                    ? 'text-main-500'
                    : 'hover:bg-main-500/10 text-gray-100'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <MenuManagementIcon
                  width={20}
                  height={20}
                  color={
                    pathname === '/menu/edit' || pathname === '/menu/category'
                      ? 'text-main-500'
                      : 'text-gray-100'
                  }
                />
                {!collapsed && <span>메뉴 관리</span>}
                {!collapsed && (
                  <button
                    className={`text-mb-5 text-main-500 flex items-center gap-2 focus:outline-none ${
                      collapsed ? 'justify-center px-2' : ''
                    }`}
                    onClick={() => !collapsed && setMenuOpen((v) => !v)}
                  >
                    <ChevronDownIcon width={20} height={20} />
                  </button>
                )}
              </Link>

              {menuOpen && !collapsed && (
                <div className="mt-2 flex flex-col gap-1">
                  <Link
                    href="/menu/edit"
                    className={`text-mb-5 flex items-center gap-3 rounded-lg px-12 py-3 text-left transition-colors ${
                      pathname === '/menu/edit'
                        ? 'bg-main-500 text-black'
                        : 'hover:bg-main-500/20 text-gray-200'
                    }`}
                  >
                    <span>메뉴 편집</span>
                  </Link>
                  <Link
                    href="/menu/category"
                    className={`text-mb-5 flex items-center gap-3 rounded-lg px-12 py-3 text-left transition-colors ${
                      pathname === '/menu/category'
                        ? 'bg-main-500 text-black'
                        : 'hover:bg-main-500/10 text-gray-200'
                    }`}
                  >
                    <span>순서·카테고리 편집</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/recommend"
              className={`text-mb-3 flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${
                pathname === '/recommend'
                  ? 'text-main-500'
                  : 'hover:bg-main-500/10 text-gray-100'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <RecommandManagementIcon width={20} height={20} />
              {!collapsed && <span>추천 관리</span>}
            </Link>

            <Link
              href="/shop"
              className={`text-mb-3 flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${
                pathname === '/shop'
                  ? 'text-main-500'
                  : 'hover:bg-main-500/10 text-gray-100'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <ShopManagementIcon width={20} height={20} />
              {!collapsed && <span>매장 정보 관리</span>}
            </Link>

            <Link
              href="/preview"
              className={`text-mb-3 flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${
                pathname === '/preview'
                  ? 'text-main-500'
                  : 'hover:bg-main-500/10 text-gray-100'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <PreviewMenuIcon width={20} height={20} />
              {!collapsed && <span>내 메뉴판 보기</span>}
            </Link>

            <Link
              href="/dashboard"
              className={`text-mb-3 flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${
                pathname === '/dashboard'
                  ? 'text-main-500'
                  : 'hover:bg-main-500/10 text-gray-100'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <DashboardIcon width={20} height={20} />
              {!collapsed && <span>대시보드</span>}
            </Link>

            <Link
              href="/link"
              className={`text-mb-3 flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${
                pathname === '/link'
                  ? 'text-main-500'
                  : 'hover:bg-main-500/10 text-gray-100'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <TableLinkIcon width={20} height={20} />
              {!collapsed && <span>테이블 연동</span>}
            </Link>
          </nav>
        ) : (
          <nav className="mt-6 flex flex-col gap-8">
            <Link
              href="/order"
              className={`text-mb-3 flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${
                pathname === '/order'
                  ? 'text-main-500'
                  : 'hover:bg-main-500/10 text-gray-100'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <TableLinkIcon width={20} height={20} />
              {!collapsed && <span>주문 현황</span>}
            </Link>

            <Link
              href="/history"
              className={`text-mb-3 flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${
                pathname === '/history'
                  ? 'text-main-500'
                  : 'hover:bg-main-500/10 text-gray-100'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <DashboardIcon width={20} height={20} />
              {!collapsed && <span>주문 내역</span>}
            </Link>
          </nav>
        )}
      </div>

      <div>
        <nav className="flex flex-col gap-2 px-4">
          <Link
            href="/settings"
            className={`text-mb-3 flex items-center gap-3 rounded-lg px-2 py-2 text-gray-100 transition-colors ${
              pathname === '/settings'
                ? 'text-main-500'
                : 'hover:bg-main-500/10 text-gray-100'
            } ${collapsed ? 'justify-center' : ''}`}
          >
            <SettingIcon width={20} height={20} />
            {!collapsed && <span>설정</span>}
          </Link>
        </nav>
      </div>
    </aside>
  );
}
