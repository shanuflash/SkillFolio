import { NextResponse } from "next/server";
import { UserDetails } from "../utils/schema";
import dbConnection from "../utils/db";

dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);

// get all user
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  try {
    const userDetail = await UserDetails.find({
      name: new RegExp(`${name}`, "i"),
    });
    return NextResponse.json({ userDetail }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
