import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const token = request.cookies.get('uid')?.value || '';
    console.log(token)
    const path = request.nextUrl.pathname;
    const regexPattern = /^\/id\/.*$/;
    if(regexPattern.test(path) && token===''){
        return NextResponse.redirect(new URL('/', request.url))
    }
}
export const config = {
  matcher: [`/:path*`],
}