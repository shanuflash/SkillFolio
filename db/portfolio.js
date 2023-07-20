import mongoose from "mongoose";

const dbConnection = (URL) => {
  try {
    mongoose.connect(URL);
  } catch (error) {
    console.log("Error in connecting to DB", error);
  }
};

export default dbConnection;
