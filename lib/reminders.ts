import { getStageById, getTaskByDay } from "./curriculum";
import { prisma } from "./prisma";
import { sendPushPlusMessage } from "./pushplus";

function currentTimeKey(date = new Date()) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function sentDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function isWithinFiveMinuteWindow(reminderTime: string, nowKey: string) {
  const [rh, rm] = reminderTime.split(":").map(Number);
  const [nh, nm] = nowKey.split(":").map(Number);
  return rh === nh && Math.abs(rm - nm) < 5;
}

export async function runReminderScan(date = new Date()) {
  const nowKey = currentTimeKey(date);
  const today = sentDateKey(date);
  const settings = await prisma.reminderSetting.findMany({
    where: {
      enabled: true,
      pushplusToken: { not: null },
    },
    include: {
      user: {
        include: {
          progress: true,
        },
      },
    },
  });

  let sent = 0;

  for (const setting of settings) {
    if (!setting.pushplusToken || !isWithinFiveMinuteWindow(setting.reminderTime, nowKey)) continue;
    const progress = setting.user.progress;
    if (!progress || progress.completedDaysCount >= 60) continue;

    const task = getTaskByDay(progress.currentDay);
    const note = await prisma.learningNote.findUnique({
      where: { userId_day: { userId: setting.userId, day: task.day } },
    });
    if (note) continue;

    const existingLog = await prisma.reminderLog.findUnique({
      where: {
        userId_day_sentDate: {
          userId: setting.userId,
          day: task.day,
          sentDate: today,
        },
      },
    });
    if (existingLog) continue;

    const stage = getStageById(task.stageId);
    const content = [
      `## 今日学习任务：第 ${task.day} 天 - ${task.title}`,
      `阶段：${stage.name}`,
      "",
      "你还没有提交今天的学习笔记。",
      "",
      `今日任务：${task.actionTask}`,
      "",
      `笔记提示：${task.notePrompt}`,
    ].join("\n");

    await sendPushPlusMessage(setting.pushplusToken, "AI 产品经理学习提醒", content);
    await prisma.reminderLog.create({
      data: {
        userId: setting.userId,
        day: task.day,
        sentDate: today,
      },
    });
    sent += 1;
  }

  return { sent };
}
