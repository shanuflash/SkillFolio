import { NextResponse } from "next/server";
import { UserDetails } from "../../utils/schema";
import dbConnection from "../../utils/db";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { writeFile } from "fs/promises";

dbConnection(process.env.NEXT_PUBLIC_MONGO_URL);
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUD_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUD_API_SECRET,
  secure: true,
});

// get user
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
    next(error);
  }
}

//upload image
export async function POST(req, { params }) {
  try {
    const id = params.id;
    const formData = await req.formData();
    const file = formData.get("file");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = process.cwd() + "/public/" + file.name;

    if (file) {
      try {
        await writeFile(path, buffer);
      } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
      const { secure_url } = await cloudinary.uploader.upload(path, {
        folder: "profile",
      });
      fs.unlinkSync(path);
      await UserDetails.findByIdAndUpdate(
        { _id: id },
        { photo: secure_url },
        {
          new: true,
        }
      );
      return NextResponse.json(
        { message: "Profile photo updated successfully", secure_url },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
