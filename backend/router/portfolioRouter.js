import express from "express";
import { Signin, Signup } from "../Controllers/portfolioControllers.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.route("/").post(Signin);
router.route("/create").post(Signup);

export default router;
