import { NextResponse } from "next/server";
import { UserDetails } from "../utils/schema";
import dbConnection from "../utils/db";

dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);

//filter users by skills and name
export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") || null;
  const data = await req.json();
  let query = {};
  if (data.length) query = { skills: { $in: data } };
  if (name) query = { ...query, name: new RegExp(`${name}`, "i") };
  try {
    const userDetail = await UserDetails.find(query, {
      photo: 1,
      name: 1,
      _id: 1,
    });
    return NextResponse.json({ userDetail }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
