import { NextResponse } from "next/server";
import dbConnection from "../utils/db.js";
import { authUser } from "../utils/schema.js";

dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);
export async function GET(req) {
  // try {
  //   const { email, password, newpassword } = await req.json();
  //   if (!email || !password || !newpassword) {
  //     return NextResponse.json("Email or Password is missing", { status: 400 });
  //   }
  //   console.log(email, password, newpassword);
  //   // try {
  //   //   await authUser.create({
  //   //     email: email,
  //   //     password: password,
  //   //   });
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  //   return NextResponse.json({ message: "User Created" }, { status: 200 });
  // } catch (error) {
  //     return NextResponse.json({ message: error.message }, { status: 500 });
  // }
  //   console.log(req);
  return NextResponse.json({ message: "User Created" }, { status: 200 });
}
