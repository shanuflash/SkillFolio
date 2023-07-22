import { NextResponse } from "next/server";
import { UserDetails } from "../../utils/schema";

export async function GET(req, { params }) {
  const id = params.id;
  try {
    const userDetail = await UserDetails.find({ _id: id });
    if (!userDetail) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ userDetail }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
