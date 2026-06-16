export const DEMO_USER_ID = "demo-user";

type DemoState = {
  currentDay: number;
  completedDaysCount: number;
  latestCompletedAt: Date | null;
};

const globalForDemo = globalThis as unknown as { demoState?: DemoState };

export function isDemoMode() {
  return process.env.DEMO_AUTH_ENABLED === "true";
}

export function isDemoUserId(userId: string) {
  return isDemoMode() && userId === DEMO_USER_ID;
}

export function getDemoCredentials() {
  return {
    email: process.env.DEMO_EMAIL ?? "liuna0617@gmail.com",
    password: process.env.DEMO_PASSWORD ?? "12345678",
    name: process.env.DEMO_NAME ?? "学习者",
  };
}

export function getDemoProgress() {
  if (!globalForDemo.demoState) {
    globalForDemo.demoState = {
      currentDay: 12,
      completedDaysCount: 25,
      latestCompletedAt: null,
    };
  }

  return {
    id: "demo-progress",
    userId: DEMO_USER_ID,
    currentDay: globalForDemo.demoState.currentDay,
    completedDaysCount: globalForDemo.demoState.completedDaysCount,
    latestCompletedAt: globalForDemo.demoState.latestCompletedAt,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function completeDemoDay() {
  const progress = getDemoProgress();
  globalForDemo.demoState = {
    currentDay: progress.currentDay >= 60 ? 60 : progress.currentDay + 1,
    completedDaysCount: Math.max(progress.completedDaysCount, progress.currentDay),
    latestCompletedAt: new Date(),
  };
}
