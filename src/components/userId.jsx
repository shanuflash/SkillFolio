"use server";

import { jwtVerifier } from "@/app/api/utils/jwt";
import { cookies } from "next/headers";

const userId = async () => {
  const { value } = cookies().get("token") || {};
  const { payload } = await jwtVerifier(value);
  return payload?.user || null;
};

export default userId;
