import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const host = req.headers.get('host');
  if (host) {
    const local = host.split(':').at(0) ?? 'Unknown';
    if (local === 'localhost' || host === process.env.HOST) {
      return NextResponse.next();
    }
  }
  console.log('Unauthorized Access Attempt From: ' + host);
  return NextResponse.redirect(new URL('/unauthorized', req.url));
}

export const config = {
  matcher: ['/api/:path*'],
};
