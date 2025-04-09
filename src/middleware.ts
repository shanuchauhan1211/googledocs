import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt");

  if (!cookie) {
    return NextResponse.redirect(new URL("/auth/SignIn", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/documents"],
};
