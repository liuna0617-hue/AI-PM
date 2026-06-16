import { Bell } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ReminderSettingsForm } from "@/components/reminder-settings-form";
import { requireUser } from "@/lib/auth";
import { isDemoUserId } from "@/lib/demo";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const user = await requireUser();
  const setting = isDemoUserId(user.id)
    ? { enabled: false, pushplusToken: "", reminderTime: "20:00" }
    : await prisma.reminderSetting.upsert({
        where: { userId: user.id },
        update: {},
        create: { userId: user.id, enabled: false, reminderTime: "20:00" },
      });

  return (
    <AppShell userName={user.name}>
      <section className="max-w-2xl rounded-2xl border border-river/15 bg-white p-6 shadow-soft">
        <p className="flex items-center gap-2 text-sm font-semibold text-river">
          <Bell className="h-4 w-4" />
          学习提醒
        </p>
        <h1 className="mt-2 text-3xl font-semibold">提醒设置</h1>
        <p className="mt-2 text-ink/60">配置 PushPlus token 和每日提醒时间。未完成当前任务时，系统会推送微信提醒。</p>
        <div className="mt-6">
          <ReminderSettingsForm
            initialEnabled={setting.enabled}
            initialToken={setting.pushplusToken ?? ""}
            initialTime={setting.reminderTime}
          />
        </div>
      </section>
    </AppShell>
  );
}
