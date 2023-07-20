import { NextResponse } from "next/server";
import { badRequest, SuccessRequest } from "../error/index.js";
import Portfolio from "../schema/portfolioSchema.js";
import createToken from "../utils/jwt.js";

export async function POST(req, res) {
  try {
    const { Email, Password } = await req.json();
    if (!Email || !Password) {
      throw new badRequest("Email or Password is missing");
    }
    const User = await Portfolio.findOne({
      Email: req.body.Email,
      Password: req.body.Password,
    });
    if (User) {
      const token = createToken(User);
      let response = NextResponse.next();
      response.cookies.set("token", token, {
        secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      // access cookie in frontend use cookie-parser
      throw new SuccessRequest("User logged in successfully");
    } else {
      throw new badRequest("User does not exist");
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
