import Express from "express";
import dbConnection from "../src/app/auth/db/portfolio.js";
import {} from "dotenv/config.js";
import portfolioRouter from "./router/portfolioRouter.js";
import errorHandler from "./Middleware/error-handler.js";
import cors from "cors";

const app = Express();
app.use(cors());

app.use(Express.json());
app.use("/api/portfolio", portfolioRouter);
app.use(errorHandler);

const connection = () => {
  try {
   
    app.listen(3001, (req, res) => {
      console.log("Server is running at port 3001");
    });
  } catch (error) {
    console.log("Error in connecting to DB", error);
  }
};

connection();
