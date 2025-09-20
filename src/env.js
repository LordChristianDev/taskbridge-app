import { z } from "zod";

const envSchema = z.object({
	SUPABASE_PROJECT_URL: z.string().url().startsWith("https://"),
	SUPABASE_ANON_KEY: z.string().min(1),
	SUPABASE_SERVICE_ROLE: z.string().optional(),
});

export const env = envSchema.parse({
	SUPABASE_PROJECT_URL: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
	SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
	SUPABASE_SERVICE_ROLE: process.env.SUPABASE_SERVICE_ROLE,
});