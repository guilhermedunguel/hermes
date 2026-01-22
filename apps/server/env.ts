import z from "zod";

const envSchema = z.object({
	FASTIFY_PORT: z.coerce.number(),
});

export const env = envSchema.parse(process.env);
