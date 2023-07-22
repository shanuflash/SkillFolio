import { NextResponse } from "next/server";
import { UserDetails } from "../../utils/schema";

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

export async function POST(req, { params }) {
  const id = params.id;
  const data = await req.json();
  //figure out how to upload image in nextjs
  // if (req.files) {
  //   var src = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
  //     folder: "userimage",
  //   });
  //   fs.unlinkSync(req.files.image.tempFilePath);
  // }
  try {
    data.user = id;
    // data.photo = src.secure_url;
    const userDetail = await UserDetails.create(data);
    return NextResponse.json({ userDetail }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
