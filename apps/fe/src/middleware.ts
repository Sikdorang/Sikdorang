import { NextRequest, NextResponse } from 'next/server';
import { KEYS } from './constants/storage';

const ROUTES = {
  LOGIN: '/',
  AFTER_LOGIN: '/menu',
};

export function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const { pathname } = nextUrl;

  const accessToken = cookies.get(KEYS.ACCESS_TOKEN)?.value;
  const isLoginPage = pathname === ROUTES.LOGIN;

  // 로그인한 사용자가 로그인 페이지에 접근하려 할 때
  if (isLoginPage && accessToken) return NextResponse.redirect(new URL(ROUTES.AFTER_LOGIN, request.url));

  // 로그인하지 않은 사용자가 보호된 페이지에 접근할 때
  if (!isLoginPage && !accessToken) return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest|icons/).*)'],
};
