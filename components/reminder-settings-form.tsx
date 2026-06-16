"use client";

import { useState } from "react";

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
      <label className="flex items-center gap-3">
        <input type="checkbox" checked={enabled} onChange={(event) => setEnabled(event.target.checked)} />
        <span className="font-medium">开启每日微信提醒</span>
      </label>
      <label className="block">
        <span className="text-sm font-medium">PushPlus token</span>
        <input
          value={pushplusToken}
          onChange={(event) => setPushplusToken(event.target.value)}
          className="focus-ring mt-2 w-full rounded-md border border-ink/15 bg-white px-3 py-2"
          placeholder="从 PushPlus 获取你的 token"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">每日提醒时间</span>
        <input
          type="time"
          value={reminderTime}
          onChange={(event) => setReminderTime(event.target.value)}
          className="focus-ring mt-2 rounded-md border border-ink/15 bg-white px-3 py-2"
        />
      </label>
      {message ? <p className="rounded-md bg-river/10 px-3 py-2 text-sm text-river">{message}</p> : null}
      <button onClick={save} disabled={loading} className="focus-ring rounded-md bg-ink px-4 py-2 font-medium text-white hover:bg-moss disabled:opacity-60">
        {loading ? "保存中..." : "保存提醒设置"}
      </button>
    </div>
  );
}
