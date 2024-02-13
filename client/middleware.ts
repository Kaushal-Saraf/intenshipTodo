import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const token = request.cookies.get('uid')?.value || '';
}
export const config = {
  matcher: [`/:path*`],
}