import { jwtVerify } from "jose";

export async function isLoggedIn(session: string | undefined) {
  if (!session) return false;
  if (session) {
    const valid = await verifyJWT(session, "boolean");
    return valid;
  }
  return false;
}

async function verifyJWT(token: string, type: "boolean" | "string") {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    if (!secret) throw new Error("JWT secret is not defined");
    const { payload } = await jwtVerify(token, secret);
    if (type === "boolean") return true;
    return payload;
  } catch (error) {
    return false;
  }
}
