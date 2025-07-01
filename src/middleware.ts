import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from './lib/auth0';
export async function middleware(request: NextRequest) {
  const { origin } = new URL(request.url);
  try {
    const authRes = await auth0.middleware(request); // Returns a NextResponse object
  
    if (request.nextUrl.pathname.startsWith("/auth")) {
      return authRes;
    }
  
    const session = await auth0.getSession();
    if (!session) {
      return NextResponse.redirect(`${origin}/auth/login`)
    }
    // If a valid session exists, continue with the response from Auth0 middleware
    // You can also add custom logic here...
    return authRes
    // return await auth0.middleware(request) // Returns a NextResponse object
  } catch (err) {
    console.error('Auth0 middleware error:', err);
    return NextResponse.redirect(`${origin}/auth/login`)
  }
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