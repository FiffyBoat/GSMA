import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_USER = process.env.ADMIN_BASIC_AUTH_USER;
const ADMIN_PASS = process.env.ADMIN_BASIC_AUTH_PASS;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin') return NextResponse.next();
    if (pathname === '/admin/login') return NextResponse.next();

    const hasAdminSession = Boolean(req.cookies.get('admin_session')?.value);
    if (hasAdminSession) return NextResponse.next();

    // If admin creds are not set, do not block (app may rely on another auth mechanism).
    if (!ADMIN_USER || !ADMIN_PASS) return NextResponse.next();

    const auth = req.headers.get('authorization') || '';
    if (!auth.startsWith('Basic ')) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
      });
    }

    const b64 = auth.slice(6);
    let decoded = '';
    try {
      // atob is available in Edge/worker runtime
      decoded = atob(b64);
    } catch (e) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const [user, pass] = decoded.split(':');
    if (user !== ADMIN_USER || pass !== ADMIN_PASS) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
      });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
