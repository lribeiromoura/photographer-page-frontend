// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({
    req: request,
    secret,
    raw: true,
  });

  const { pathname } = request.nextUrl;

  // Se não há token e a rota é /admin ou qualquer subrota de /admin, redirecione para /admin (login)
  if (!token && pathname.startsWith('/admin/')) {
    return NextResponse.redirect(new URL('/admin', request.nextUrl));
  }

  // Se há um token e a rota é /admin, redirecione para /admin/media
  if (token && pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/media', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
