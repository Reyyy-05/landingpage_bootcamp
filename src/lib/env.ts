import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().optional(),
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL")
    .default("https://ykwhzjrrcpgsxbganqpm.supabase.co"),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is required")
    .default("PeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrd2h6anJyY3Bnc3hiZ2FucXBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4Nzg0MDQsImV4cCI6MjA5MzQ1NDQwNH0.-4nuMQOnPnWRzZEFC-Yxw7dVxsIvjZleYBHkZLUYvyg"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url("NEXT_PUBLIC_APP_URL must be a valid URL")
    .default("https://creativemuacademy.com"),
  NEXT_PUBLIC_ADMIN_WA_NUMBER: z
    .string()
    .default("6285177114036"),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_META_PIXEL_ID: z.string().optional(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

function parseEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error(
      "❌ Invalid environment variables configuration:",
      result.error.flatten().fieldErrors
    );
    throw new Error(
      "Environment validation failed. Please check your .env or .env.local file."
    );
  }

  return result.data;
}

export const env = parseEnv();
