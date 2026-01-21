import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

export function healthRoute(fastify: FastifyInstance) {
	const app = fastify.withTypeProvider<ZodTypeProvider>();

	app.get(
		"/health",
		{
			schema: {
				response: {
					200: z.object({
						status: z.enum(["ok", "error"]),
					}),
				},
			},
		},
		async (_, reply) => {
			return reply.status(200).send({ status: "ok" });
		},
	);
}
