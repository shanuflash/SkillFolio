import { NextResponse } from "next/server";
import { badRequest } from "../utils/reqError.js";
import { authUser } from "../utils/schema.js";
import { jwtGenrator } from "../utils/jwt.js";
import dbConnection from "../utils/db.js";
import comparePassword from "../utils/passCompare.js";

dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);
export async function POST(req, res) {
  try {
    const { Email, Password } = await req.json();
    if (!Email || !Password) {
      throw new badRequest("Email or Password is missing");
    }
    const User = await authUser.findOne({ email: Email });
    if (!User) {
      throw new badRequest("User not found");
    }
    const isMatch = await comparePassword(Password, User.password);
    if (!isMatch) {
      throw new badRequest("Password is not correct");
    }
    const token = await jwtGenrator({ payload: User._id });
    const response = NextResponse.json(
      { message: "User Found" },
      { status: 200 }
    );
    response.cookies.set("user", User._id, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
