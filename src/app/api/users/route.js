import { NextResponse } from "next/server";
import { UserDetails } from "../utils/schema";
import dbConnection from "../utils/db";

dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);

// get all user
export async function GET(req) {
  try {
    const userDetail = await UserDetails.find();
    return NextResponse.json({ userDetail }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
