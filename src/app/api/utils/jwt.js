import { SignJWT, jwtVerify } from "jose";

const jwtGenrator = async ({ payload }) => {
  console.log("payload", payload.toString());
  const test = payload.toString();
  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
  const alg = "HS256";
  return await new SignJWT({ test })
    .setProtectedHeader({ alg })
    .setExpirationTime(process.env.NEXT_PUBLIC_JWT_EXPIRE)
    .setIssuedAt()
    .sign(secret);
};

const jwtVerifier = (token) => {
  const decoded = jose.jwtVerify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
  return decoded;
};

export { jwtGenrator, jwtVerifier };
