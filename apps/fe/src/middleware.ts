import { NextRequest, NextResponse } from 'next/server';
import { STORAGE_KEYS } from './constants/storage';

const PROTECTED_PATHS = ['/menu', '/edit', '/preview'];

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(STORAGE_KEYS.accessToken)?.value;

  const isProtected = PROTECTED_PATHS.some((path) => req.nextUrl.pathname.startsWith(path));
  console.log(accessToken, isProtected);
  if (isProtected && !accessToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/menu/:path*', '/edit/:path*', '/preview/:path*'],
};
