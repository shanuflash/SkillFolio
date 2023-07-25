import { NextResponse } from "next/server";
import { authUser } from "../utils/schema.js";
import { jwtGenrator } from "../utils/jwt.js";
import dbConnection from "../utils/db.js";
import comparePassword from "../utils/passCompare.js";

dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);
export async function POST(req) {
  try {
    const { Email, Password } = await req.json();
    if (!Email || !Password) {
      return NextResponse.json(
        { message: "Email or Password is missing" },
        { status: 400 }
      );
    }
    const User = await authUser.findOne({ email: Email });
    if (!User) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const isMatch = await comparePassword(Password, User.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Incorrect Password" },
        { status: 400 }
      );
    }
    const token = await jwtGenrator({ payload: User._id });
    const response = NextResponse.json(
      { message: "Logged in Succesfully!" },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
