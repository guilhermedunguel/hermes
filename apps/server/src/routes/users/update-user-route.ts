import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { updateUser } from "../../database/repositories/users/update-user.ts";

export const updateUserRoute: FastifyPluginAsyncZod = async (app) => {
	app.patch(
		"/users/:id",
		{
			schema: {
				tags: ["Users"],
				summary: "Update a user by ID",
				params: z.object({
					id: z.coerce.number(),
				}),
				body: z.object({
					name: z.string().min(3).optional(),
					email: z.email().optional(),
				}),
				response: {
					200: z.object({
						id: z.number(),
						name: z.string(),
						email: z.email(),
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
				const { name, email } = request.body;

				const result = await updateUser({ id, user: { name, email } });

				return reply.status(200).send(result.user);
			} catch (error) {
				console.error("Error updating user:", error);
				return reply.status(500).send({ message: "Internal Server Error" });
			}
		},
	);
};
