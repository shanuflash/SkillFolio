import { NextResponse } from "next/server";
import { UserDetails } from "../utils/schema";

export async function GET(req) {
  try {
    const userDetail = await UserDetails.find();
    return NextResponse.json({ userDetail }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
