import { NextResponse } from "next/server";
import { UserDetails } from "../../utils/schema";
import dbConnection from "../../utils/db";
import { badRequest } from "../../utils/reqError";

dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);

// get user
export async function GET(req, { params }) {
  const id = params.id;
  try {
    const userDetail = await UserDetails.findOne({ _id: id });
    if (userDetail.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ userDetail }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// update user
export async function PUT(req, { params }) {
  const id = params.id;
  const data = await req.json();
  try {
    const userDetail = await UserDetails.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (!userDetail) {
      throw new badRequest("User not found");
    }
    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  const id = params.id;
  const data = {
    _id: id,
    user: id,
    name: "your name",
    designation: "your designation",
    description: "your description",
    address: "your address",
    phone: "0000000000",
    email: "name@email.com",
    dob: "dd/mm/yyyy",
    socials: {
      linkedin: "name",
      github: "name",
    },
    education: [],
    skills: [],
    experience: [],
    projects: [],
    photo:
      "https://res.cloudinary.com/duvnd0paq/image/upload/v1690172286/profile/f1fyang6vzvzjjx2uyn6.svg",
  };
  try {
    const userDetail = await UserDetails.create(data);
    return NextResponse.json({ userDetail }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
