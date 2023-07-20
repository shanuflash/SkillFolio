import mongoose from "mongoose";

const dbConnection = (URL) => {
  try {
    mongoose.connect(URL);
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connection established successfully");
    });
  } catch (error) {
    console.log("Error in connecting to DB", error);
  }
};

export default dbConnection;
