import { NextResponse } from "next/server";
import { UserDetails } from "../../utils/schema";
import dbConnection from "../../utils/db";

dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);

// get user
export async function GET({ params }) {
  const id = params.id;
  try {
    const userDetail = (await UserDetails.findOne({ _id: id })) || [];
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
      return NextResponse.json("User not found", { status: 404 });
    }
    return NextResponse.json({ message: "Details updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST({ params }) {
  const id = params.id;
  const data = {
    _id: id,
    user: id,
    name: "your name",
    designation: "your designation",
    regNo: "Enter your Regestration Number",
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
    certificates: [],
    languages: [],
    photo:
      "https://res.cloudinary.com/duvnd0paq/image/upload/v1690611216/profile/default.svg",
  };
  try {
    const userDetail = await UserDetails.create(data);
    console.log(userDetail);
    return NextResponse.json({ userDetail }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
