import jwt from "jsonwebtoken";

const jwtGenrator = ({ payload }) => {
  const token = jwt.sign({ payload }, process.env.NEXT_PUBLIC_JWT_SECRET, {
    expiresIn: process.env.NEXT_PUBLIC_JWT_EXPIRE,
  });
  return token;
};

const jwtVerify = (token) => {
  const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
  return decoded;
};

export { jwtGenrator, jwtVerify };
