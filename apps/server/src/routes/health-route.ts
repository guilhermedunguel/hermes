import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const getHealthRoute: FastifyPluginAsyncZod = async (app) => {
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
};
