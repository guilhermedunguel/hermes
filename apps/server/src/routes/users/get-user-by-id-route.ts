import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { getUserById } from "../../database/repositories/users/get-user-by-id.ts";

export const getUserByIdRoute: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/users/:id",
		{
			schema: {
				tags: ["Users"],
				summary: "Get a user by ID",
				params: z.object({
					id: z.coerce.number(),
				}),
				response: {
					200: z.object({
						id: z.number(),
						name: z.string(),
						email: z.email(),
					}),
					404: z.object({
						message: z.string(),
					}),
					500: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			try {
				const { id } = request.params;

				const result = await getUserById({ id });

				if (result.user) {
					return reply.status(200).send(result.user);
				}

				return reply.status(404).send({
					message: "User not found",
				});
			} catch (error) {
				console.error("Error fetching user by ID:", error);
				return reply.status(500).send({ message: "Internal Server Error" });
			}
		},
	);
};
