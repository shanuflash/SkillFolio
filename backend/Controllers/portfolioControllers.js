import { badRequest, SuccessRequest } from "../error/index.js";
import Portfolio from "../../src/app/auth/schema/portfolioSchema.js";
import createToken from "../../src/app/auth/utils/jwt.js";

const Signin = async (req, res, next) => {
  try {
    if (!req.body.Email || !req.body.Password) {
      throw new badRequest("Email or Password is missing");
    }
    const User = await Portfolio.findOne({
      Email: req.body.Email,
      Password: req.body.Password,
    });
    if (User) {
      const token = createToken(User);
      res.cookie("token", token, {
        secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      // access cookie in frontend use cookie-parser
      throw new SuccessRequest("User logged in successfully");
    } else {
      throw new badRequest("User does not exist");
    }
  } catch (error) {
    next(error);
  }
};

const Signup = async (req, res, next) => {
  try {
    if (!req.body.Email || !req.body.Password) {
      throw new badRequest("Email or Password is missing");
    }
    const User = await Portfolio.create({
      Email: req.body.Email,
      Password: req.body.Password,
    });
    if (User) {
      throw new badRequest("User already exist");
    } else {
      const newUser = await Portfolio.create(req.body);
      throw new SuccessRequest("User created successfully");
    }
  } catch (error) {
    next(error);
  }
};

export { Signin, Signup };
