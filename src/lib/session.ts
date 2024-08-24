"use server";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "@/lib/auth_form_definitions";
import { cookies } from "next/headers";
import { User } from "@prisma/client";

const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch (error) {
    console.log("Failed to verify session");
    return null;
  }
}

export async function createSession(
  userId: User["id"],
  userRole: User["role"]
) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, userRole, expiresAt });

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  cookies().set("session", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
    sameSite: "lax",
    path: "/",
  });
}

export async function getUserId() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  const res = (await decrypt(session)) as SessionPayload;
  return res.userId;
}
