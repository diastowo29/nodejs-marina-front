import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';

export default withMiddlewareAuthRequired(async function middleware(req) {
    console.log(req.url);
    console.log(req.headers.get('Authorization'));
    const res = NextResponse.next();
    return res;
  });
export const config = {
matcher: [
    /*
    * Match all request paths except for the ones starting with:
    * - api (API routes)
    * - static (static files)
    * - favicon.ico (favicon file)
    */
    '/((?!api|static|favicon.ico).*)',
],
}
  