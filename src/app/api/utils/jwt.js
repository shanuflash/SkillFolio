import { SignJWT, jwtVerify } from "jose";

const jwtGenrator = async ({ payload }) => {
  console.log("payload", payload.toString());
  const user = payload.toString();
  const alg = "HS256";
  return await new SignJWT({ user })
    .setProtectedHeader({ alg })
    .setExpirationTime(process.env.NEXT_PUBLIC_JWT_EXPIRE)
    .setIssuedAt()
    .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));
};

const jwtVerifier = async (token) => {
  return await jwtVerify(
    token,
    new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
  );
};

export { jwtGenrator, jwtVerifier };
