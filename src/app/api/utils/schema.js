import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const SocialSchema = mongoose.Schema({
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  instagram: {
    type: String,
  },
  linkedin: {
    type: String,

    message: "Linkedin is required",
  },
  github: {
    type: String,

    message: "Github is required",
  },
});

const EducationSchema = mongoose.Schema([
  {
    name: {
      type: String,
      required: true,
      message: "Degree is required",
    },
    description: {
      type: String,
      required: true,
      message: "College is required",
    },
  },
]);

const ExperienceSchema = mongoose.Schema([
  {
    name: {
      type: String,
      required: true,
      message: "Expreience name is required",
    },
    description: {
      type: String,
      required: true,
      message: "Expreience description is required",
    },
  },
]);

const ProjectSchema = mongoose.Schema([
  {
    name: {
      type: String,
      required: true,
      message: "Project name is required",
    },
    description: {
      type: String,
      required: true,
      message: "Project description is required",
    },
    link: {
      type: String,
      required: true,
      message: "Project link is required",
    },
  },
]);

const UserDetailSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
      // unique: true,
    },
    name: {
      type: String,
      required: true,
      message: "Name is required",
    },
    designation: {
      type: String,
      required: true,
      message: "Designation is required",
    },
    description: {
      type: String,
      required: true,
      message: "Description is required",
    },
    address: {
      type: String,
      required: true,
      message: "Address is required",
    },
    phone: {
      type: Number,
      required: true,
      minlength: 10,
      maxlength: 10,
      message: "Phone number is required",
    },
    dob: {
      type: String,
      required: true,
      message: "Date of birth is required",
    },
    social: SocialSchema,
    education: [EducationSchema],
    skills: {
      type: [String],
      required: true,
      message: "Skills is required",
    },
    experience: [ExperienceSchema],
    project: [ProjectSchema],
    photo: {
      type: String,
      required: true,
      message: "Photo is required",
    },
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validator: {
        validate: (value) => validator.isEmail(value),
        message: "Email is not valid",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { timestamps: true }
);

User.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const UserDetails =
  mongoose.models.UserDetails ||
  mongoose.model("UserDetails", UserDetailSchema);

const authUser = mongoose.models.authUser || mongoose.model("authUser", User);

export { authUser, UserDetails };
