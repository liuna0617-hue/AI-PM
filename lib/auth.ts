import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DEMO_USER_ID, getDemoCredentials, isDemoMode } from "./demo";
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

  if (isDemoMode() && session.userId === DEMO_USER_ID) {
    const demo = getDemoCredentials();
    return {
      id: DEMO_USER_ID,
      name: demo.name,
      email: demo.email,
      passwordHash: "",
      createdAt: new Date(),
    };
  }

  return prisma.user.findUnique({
    where: { id: session.userId },
  });
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
