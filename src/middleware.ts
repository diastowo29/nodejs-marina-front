import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from './lib/auth0';
export async function middleware(request: NextRequest) {
  const authRes = await auth0.middleware(request); // Returns a NextResponse object

  if (request.nextUrl.pathname.startsWith("/auth")) {
    return authRes;
  }

  // Allow access to public routes without requiring a session
  // if (request.nextUrl.pathname === ("/")) {
  //   return authRes;
  // }

  const { origin } = new URL(request.url);
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.redirect(`${origin}/auth/login`)
  }
  // If a valid session exists, continue with the response from Auth0 middleware
  // You can also add custom logic here...
  return authRes

  
  // return await auth0.middleware(request) // Returns a NextResponse object
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}