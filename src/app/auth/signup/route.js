import { NextResponse } from "next/server";
import { badRequest, SuccessRequest } from "../error/index.js";
import Portfolio from "../schema/portfolioSchema.js";
import createToken from "../utils/jwt.js";
import dbConnection from "../db/portfolio.js";

dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);

export async function GET(req) {
  try {
    if (!req.body.Email || !req.body.Password) {
      throw new badRequest("Email or Password is missing");
    }
    const User = await Portfolio.create({
      Email: req.body.Email,
      Password: req.body.Password,
    });
    if (User) {
      throw new badRequest("User already exist");
    } else {
      const newUser = await Portfolio.create(req.body);
      throw new SuccessRequest("User created successfully");
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
