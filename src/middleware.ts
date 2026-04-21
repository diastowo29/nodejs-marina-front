import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from './lib/auth0';
export async function middleware(request: NextRequest) {
  const { origin } = new URL(request.url);
  try {
    if (request.nextUrl.pathname.startsWith('/marketplace/callmeback')) {
      return NextResponse.next();
    }
    const authRes = await auth0.middleware(request); // Returns a NextResponse object
  
    if (request.nextUrl.pathname.startsWith("/auth")) {
      return authRes;
    }
    if (request.nextUrl.href == request.headers.get('referer')) {
      return authRes;
    }
    const isIframe = request.headers.get('sec-fetch-dest') === 'iframe';
    if (isIframe) {
      let host = request.headers.get('referer');
      let clientId = '';
      if (request.nextUrl.searchParams.has('client_id')) {
        host = decodeURIComponent(request.nextUrl.searchParams.get('origin') || '')
        clientId = request.nextUrl.searchParams.get('client_id') || '';
      }
      if (host && host.includes('zendesk.com')) {
        return authRes;
      } else {
        return new NextResponse(
          JSON.stringify({error: 'Unauthorized'}), 
          {status: 401}
        )
      }
      /* if (request.nextUrl.pathname.startsWith("/settings/lite/marketplace")) {
        return authRes;
      } */
    }

    const session = await auth0.getSession();
    if (!session) {
      if (request.nextUrl.pathname.startsWith("/api")) {
        return new NextResponse(
          JSON.stringify({error: 'Unauthorized'}), 
          {status: 401});
      } else {
        return NextResponse.redirect(`${origin}/auth/login`)
      }
    }

    // check url params
    /* const urlParams = request.nextUrl.searchParams;
    if (urlParams.has('code') || urlParams.has('shop_id') || urlParams.has('app_key') || urlParams.has('shop_region')) {
      authRes.headers.set('channel', `tiktok`);
      authRes.headers.set('code', urlParams.get('code') || '');
    } */

    // If a valid session exists, continue with the response from Auth0 middleware
    // You can also add custom logic here...

    if (request.nextUrl.pathname === '/') {
      return NextResponse.redirect(`${origin}/orders`)
    }

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