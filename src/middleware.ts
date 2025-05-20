import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Admin sayfalarını kontrol et (login sayfası hariç)
  if (path.startsWith('/admin') && path !== '/admin/login') {
    
    const token = request.cookies.get('token');
    const session = request.cookies.get('session');
    const localToken = request.cookies.get('userToken');
    
    // Cookie ve localStorage kontrolü
    const hasValidToken = token?.value || localToken?.value;
    const hasValidSession = session?.value || request.cookies.get('isAuthenticated')?.value;
    
    if (!hasValidToken || !hasValidSession) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
