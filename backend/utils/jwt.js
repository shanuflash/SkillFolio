import jwt from "jsonwebtoken";
import {} from "dotenv/config.js";

const createToken = (user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

// const verifyToken = (token) => {
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   console.log(decoded);
//   return decoded;
// };

export default createToken;
