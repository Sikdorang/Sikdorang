'use client';

import SettingIcon from '@public/icons/ic_cogwheel.svg';
import LogoutIcon from '@public/icons/ic_exit.svg';
import RecommandManagementIcon from '@public/icons/ic_flag.svg';
import PreviewMenuIcon from '@public/icons/ic_flatware.svg';
import DashboardIcon from '@public/icons/ic_histogram.svg';
import MenuManagementIcon from '@public/icons/ic_paper.svg';
import CollapsingIcon from '@public/icons/ic_screen.svg';
import ShopManagementIcon from '@public/icons/ic_shop.svg';
import Image from 'next/image';
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

  return (
    <aside
      className={`flex h-screen flex-col justify-between bg-gray-900 px-0 py-6 transition-all duration-300 ${
        collapsed ? 'w-[72px]' : 'w-[240px]'
      }`}
    >
      <div>
        <nav
          className={`mb-16 flex items-center px-4 ${collapsed ? 'justify-center' : 'justify-end'}`}
        >
          <button
            aria-label="최소화"
            onClick={() => setCollapsed(!collapsed)}
            className="hover:text-main-500 text-gray-400 transition-colors"
          >
            <Image src={CollapsingIcon} width={20} height={20} alt="최소화" />
          </button>
        </nav>

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
              <Image
                src={MenuManagementIcon}
                width={20}
                height={20}
                alt="Preview Menu"
              />
              {!collapsed && <span>메뉴 관리</span>}
              {!collapsed && (
                <button
                  className={`text-mb-5 text-main-500 flex items-center gap-2 focus:outline-none ${
                    collapsed ? 'justify-center px-2' : ''
                  }`}
                  onClick={() => !collapsed && setMenuOpen((v) => !v)}
                >
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
              )}
            </Link>

            {menuOpen && !collapsed && (
              <div className="mt-2 flex flex-col gap-1">
                <Link
                  href="/menu/edit"
                  className={`text-mb-5 flex items-center gap-3 rounded-lg px-12 py-3 text-left transition-colors ${
                    pathname === '/menu/edit'
                      ? 'bg-main-500 text-bk'
                      : 'hover:bg-main-500/20 text-gray-200'
                  }`}
                >
                  <span>메뉴 편집</span>
                </Link>
                <Link
                  href="/menu/category"
                  className={`text-mb-5 flex items-center gap-3 rounded-lg px-12 py-3 text-left transition-colors ${
                    pathname === '/menu/category'
                      ? 'bg-main-500 text-bk'
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
            <Image
              src={RecommandManagementIcon}
              width={20}
              height={20}
              alt="Recommand Management"
            />
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
            <Image
              src={ShopManagementIcon}
              width={20}
              height={20}
              alt="Shop Management"
            />
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
            <Image
              src={PreviewMenuIcon}
              width={20}
              height={20}
              alt="Preview Menu"
            />
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
            <Image
              src={DashboardIcon}
              width={20}
              height={20}
              alt="Shop Management"
            />
            {!collapsed && <span>대시보드</span>}
          </Link>
        </nav>
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
            <Image src={SettingIcon} width={20} height={20} alt="Setting" />
            {!collapsed && <span>설정</span>}
          </Link>

          <Link
            href="/logout"
            className={`text-mb-3 flex items-center gap-3 rounded-lg px-2 py-2 text-gray-100 transition-colors ${
              pathname === '/logout'
                ? 'text-main-500'
                : 'hover:bg-main-500/10 text-gray-100'
            } ${collapsed ? 'justify-center' : ''}`}
          >
            <Image src={LogoutIcon} width={20} height={20} alt="Logout" />
            {!collapsed && <span>로그아웃</span>}
          </Link>
        </nav>
      </div>
    </aside>
  );
}
