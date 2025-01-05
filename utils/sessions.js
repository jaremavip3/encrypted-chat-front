import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.AUTH_SECRET; // This should be a secret key in production
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId) {
  //actual date when session experies. 7 days from now.
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  //session is the encrypted token
  const session = await encrypt({ userId, expiresAt });
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteSession() {
  // cookies.delete("session");

  const cookieStore = await cookies();
  cookieStore.delete("session");
}

//Will take the User ID and experesAt time and sing the JWT token
export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}
//take the session and will try to verify it. If it can be verified it will take the payload(userID and expery time) and return it
export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload; // { userId, expiresAt } that goes to middleware middleware.js#L27
  } catch (error) {
    console.error("Failed to verify session:", error.message);
    return null;
  }
}
