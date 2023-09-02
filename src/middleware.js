import { NextResponse } from "next/server";
import { jwtVerifier } from "./app/api/utils/jwt";

export async function middleware(req) {
  const res = NextResponse.next();

  // profile page token verification
  if (req.nextUrl.pathname === "/profile") {
    try {
      const token = req.cookies.get("token")?.value;
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      const { payload } = await jwtVerifier(token);
      if (!payload) {
        res.cookie("token", null);
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } catch (error) {
      console.log(error);
    }
  }

  // login page token verification
  if (req.nextUrl.pathname === "/login") {
    try {
      const token = req.cookies.get("token")?.value;
      if (token) {
        return NextResponse.redirect(new URL("/profile", req.url));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return res;
}
