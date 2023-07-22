import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  // const pathname = req.nextUrl.pathname;

  // try {
  //   const token = req.cookies.get("token")?.value;
  //   if (!token) {
  //     // return res.status(401).json({ message: "Unauthorized" });
  //   }
  //   const verified = jwtVerify(token);
  //   console.log(verified);
  //   if (!verified) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //     // return res.status(401).json({ message: "Unauthorized" });
  //   }
  //   // req.user = verified;
  // } catch (error) {
  //   console.log(error);
  // }

  // if (!token && (pathname === "/" || pathname === "/profile")) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }
  // if (token && (pathname === "/login" || pathname === "/signup")) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }
  // const response = await fetch("http://localhost:3000/api/verify", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: token,
  // });
  // const data = await response.json();
  // if (data.message === "Token is valid") {
  //   return res;
  // } else {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }
  return res;
}
