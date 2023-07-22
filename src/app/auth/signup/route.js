import { NextResponse } from "next/server";
import { badRequest } from "../utils/reqError.js";
import dbConnection from "../utils/db.js";
import { authUser } from "../utils/schema.js";
import { StatusCodes } from "http-status-codes";

dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);
export async function POST(req) {
  try {
    const { Email, Password } = await req.json();
    if (!Email || !Password) {
      throw new badRequest("Email and Password is required");
    }
    try {
      await authUser.create({
        email: Email,
        password: Password,
      });
    } catch (error) {
      console.log(error);
    }
    return NextResponse.json(
      { message: "User Created" },
      { status: StatusCodes.CREATED }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
