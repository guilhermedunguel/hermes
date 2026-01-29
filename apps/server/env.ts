import z from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]),
	FASTIFY_PORT: z.coerce.number(),
	DATABASE_URL: z.url(),
});

export const env = envSchema.parse(process.env);
