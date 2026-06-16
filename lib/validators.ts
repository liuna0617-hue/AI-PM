import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "请输入昵称").max(30, "昵称过长"),
  email: z.string().email("请输入有效邮箱"),
  password: z.string().min(8, "密码至少 8 位"),
});

export const loginSchema = z.object({
  email: z.string().email("请输入有效邮箱"),
  password: z.string().min(1, "请输入密码"),
});

export const noteSchema = z.object({
  content: z.string().min(1, "请先写下今天的学习笔记").max(20000, "笔记内容过长"),
});

export const reminderSchema = z.object({
  enabled: z.boolean(),
  pushplusToken: z.string().max(200).optional().nullable(),
  reminderTime: z.string().regex(/^\d{2}:\d{2}$/, "提醒时间格式应为 HH:mm"),
});

export const translateSchema = z.object({
  sourceType: z.enum(["text", "txt", "srt", "vtt"]),
  sourceTitle: z.string().max(100).optional(),
  text: z.string().min(1, "请输入要转换的英文文本").max(20000, "文本过长，请分段处理"),
});
