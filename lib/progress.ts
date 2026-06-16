import { prisma } from "./prisma";
import { getCurrentStageTasks, getStageById, getTaskByDay, learningStages } from "./curriculum";

export async function ensureProgress(userId: string) {
  const existing = await prisma.userProgress.findUnique({ where: { userId } });
  if (existing) return existing;

  return prisma.userProgress.create({
    data: {
      userId,
      currentDay: 1,
      completedDaysCount: 0,
    },
  });
}

export async function getDashboardData(userId: string) {
  const progress = await ensureProgress(userId);
  const notes = await prisma.learningNote.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const isCompleted = progress.completedDaysCount >= 60;
  const currentDay = isCompleted ? 60 : progress.currentDay;
  const currentTask = getTaskByDay(currentDay);
  const currentStage = getStageById(currentTask.stageId);
  const stageTasks = getCurrentStageTasks(currentStage.id);
  const completedStageIds = learningStages
    .filter((stage) => progress.completedDaysCount >= stage.dayEnd)
    .map((stage) => stage.id);

  return {
    progress,
    notes,
    isCompleted,
    currentTask,
    currentStage,
    stageTasks,
    stages: learningStages,
    completedStageIds,
    completionPercent: Math.round((progress.completedDaysCount / 60) * 100),
  };
}

export async function submitCurrentNote(userId: string, content: string) {
  const progress = await ensureProgress(userId);
  if (progress.completedDaysCount >= 60) {
    throw new Error("训练营已经完成");
  }

  const day = progress.currentDay;
  const task = getTaskByDay(day);

  const existing = await prisma.learningNote.findUnique({
    where: {
      userId_day: {
        userId,
        day,
      },
    },
  });

  if (existing) {
    throw new Error("今天的任务已经完成");
  }

  const trimmed = content.trim();
  if (!trimmed) {
    throw new Error("请先写下今天的学习笔记");
  }

  return prisma.$transaction(async (tx) => {
    const note = await tx.learningNote.create({
      data: {
        userId,
        day,
        stageId: task.stageId,
        taskTitle: task.title,
        content: trimmed,
      },
    });

    const completedDaysCount = Math.max(progress.completedDaysCount, day);
    await tx.userProgress.update({
      where: { userId },
      data: {
        completedDaysCount,
        currentDay: day >= 60 ? 60 : day + 1,
        latestCompletedAt: new Date(),
      },
    });

    return note;
  });
}
