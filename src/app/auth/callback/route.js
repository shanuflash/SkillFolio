import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  return NextResponse.json({ code });

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    console.log(data, error);
  }
  return NextResponse.redirect(requestUrl.origin);
}
