import { NextResponse } from "next/server";
import dbConnection from "../utils/db.js";
import { authUser } from "../utils/schema.js";
import comparePassword from "../utils/passCompare.js";

dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);
export async function POST(req) {
  try {
    const { Email, Password, newPassword } = await req.json();
    if (!Email || !Password || !newPassword) {
      return NextResponse.json("Email or Password is missing", { status: 400 });
    }
    if (Password === newPassword) {
      return NextResponse.json("New Password is same as old password", {
        status: 400,
      });
    }
    const User = await authUser.findOne({ email: Email.toLowerCase() });
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
    const update = await authUser.findOneAndUpdate(
      { email: Email },
      { password: newPassword },
      { new: true }
    );
    update.save();
    return NextResponse.json({ message: "Password updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
