import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";

export type SessionData = {
  userId?: string;
};

function sessionPassword() {
  const password = process.env.SESSION_PASSWORD;
  if (!password || password.length < 32) {
    throw new Error("SESSION_PASSWORD must be at least 32 characters");
  }
  return password;
}

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), {
    cookieName: "ai_pm_session",
    password: sessionPassword(),
    cookieOptions: {
      secure: process.env.APP_URL?.startsWith("https://") ?? false,
      sameSite: "lax",
      httpOnly: true,
    },
  });
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session.userId) return null;

  return prisma.user.findUnique({
    where: { id: session.userId },
  });
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
