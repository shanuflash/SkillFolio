import { connect, connection } from "mongoose";

const dbConnection = (URL) => {
  try {
    connect(URL);
    connection.on("connected", () => {
      console.log("MongoDB connection established successfully");
    });
  } catch (error) {
    console.log("Error in connecting to DB", error);
  }
};

export default dbConnection;
