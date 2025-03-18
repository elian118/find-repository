import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export function middleware(req: NextRequest) {
  const reqHeaders = new Headers(req.headers);
  reqHeaders.set('x-pathname', req.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: reqHeaders,
    },
  });
}

export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
