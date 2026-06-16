import { NextResponse } from "next/server";
import { runReminderScan } from "@/lib/reminders";

export async function POST(request: Request) {
  const secret = request.headers.get("x-cron-secret");
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await runReminderScan();
  return NextResponse.json(result);
}
