import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/progress";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "请先登录" }, { status: 401 });
  }

  const dashboard = await getDashboardData(user.id);
  return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email }, ...dashboard });
}
