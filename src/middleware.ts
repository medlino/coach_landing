import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/', '/aktivalas', '/profil'],
};

export async function middleware(req: NextRequest) {
  try {
    const isInMaintenanceMode = true;

    const hasMaintenanceBypass =
      req.nextUrl.search.includes('maintenance=false');

    if (isInMaintenanceMode && !hasMaintenanceBypass) {
      req.nextUrl.pathname = '/maintenance';

      return NextResponse.rewrite(req.nextUrl);
    }
  } catch (error) {
    console.error(error);
  }
}
