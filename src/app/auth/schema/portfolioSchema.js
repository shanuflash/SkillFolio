import mongoose from "mongoose";
import validator from "validator";

const portfolioSchema = new mongoose.Schema(
  {
    Email: {
      type: String,
      required: true,
      unique: true,
      validator: {
        validate: (value) => {
          return validator.isEmail(value);
        },
      },
    },
    Password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Portfolio =
  mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
