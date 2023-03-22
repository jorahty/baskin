import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  let host = req.headers.get('host');
  if (host) {
    host = host.split(':').at(0) ?? 'Unknown';
    if (host === 'localhost') {
      return NextResponse.next();
    }
  }
  console.log('Unauthorized Access Attempt From: ' + host);
  return NextResponse.redirect(new URL('/unauthorized', req.url));
}

export const config = {
  matcher: ['/api/:path*'],
};
