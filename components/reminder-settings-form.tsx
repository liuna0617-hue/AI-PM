"use client";

import { useState } from "react";
import { Bell, Save } from "lucide-react";

export function ReminderSettingsForm({
  initialEnabled,
  initialToken,
  initialTime,
}: {
  initialEnabled: boolean;
  initialToken: string;
  initialTime: string;
}) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [pushplusToken, setPushplusToken] = useState(initialToken);
  const [reminderTime, setReminderTime] = useState(initialTime);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function save() {
    setLoading(true);
    setMessage("");
    const response = await fetch("/api/settings/reminder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled, pushplusToken, reminderTime }),
    });
    const data = await response.json();
    setLoading(false);
    setMessage(response.ok ? "提醒设置已保存" : data.error ?? "保存失败");
  }

  return (
    <div className="space-y-5">
      <label className="flex items-center gap-3 rounded-2xl border border-line bg-paper p-4">
        <input type="checkbox" checked={enabled} onChange={(event) => setEnabled(event.target.checked)} className="h-4 w-4 accent-river" />
        <span className="flex items-center gap-2 font-medium">
          <Bell className="h-4 w-4 text-river" />
          开启每日微信提醒
        </span>
      </label>
      <label className="block">
        <span className="text-sm font-medium">PushPlus token</span>
        <input
          value={pushplusToken}
          onChange={(event) => setPushplusToken(event.target.value)}
          className="focus-ring mt-2 w-full rounded-xl border border-line bg-paper px-3 py-2.5 shadow-sm transition focus:border-river"
          placeholder="从 PushPlus 获取你的 token"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">每日提醒时间</span>
        <input
          type="time"
          value={reminderTime}
          onChange={(event) => setReminderTime(event.target.value)}
          className="focus-ring mt-2 rounded-xl border border-line bg-paper px-3 py-2.5 shadow-sm transition focus:border-river"
        />
      </label>
      {message ? <p className="rounded-xl border border-river/15 bg-river/10 px-3 py-2 text-sm text-river">{message}</p> : null}
      <button onClick={save} disabled={loading} className="focus-ring inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-river to-cyan px-4 py-2.5 font-semibold text-white shadow-soft transition hover:brightness-105 disabled:opacity-60">
        <Save className="h-4 w-4" />
        {loading ? "保存中..." : "保存提醒设置"}
      </button>
    </div>
  );
}
