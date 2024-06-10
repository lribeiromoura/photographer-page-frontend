import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req: request, secret, raw: true });

  if (!token) {
    return NextResponse.redirect(new URL('/admin', request.nextUrl));
  }

  return NextResponse.next();
}

// Proteger todas as rotas de API
export const config = {
  matcher: ['/api/:path*'], // Adicione todas as rotas de API que deseja proteger
};
