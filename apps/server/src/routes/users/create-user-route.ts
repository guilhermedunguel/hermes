import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { createUser } from "../../database/repositories/users/create-user.ts";

export const createUserRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/users",
		{
			schema: {
				tags: ["Users"],
				summary: "Create a new user",
				body: z.object({
					name: z.string().min(3),
					email: z.email(),
				}),
				response: {
					201: z.object({
						id: z.number(),
					}),
					500: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			try {
				const { name, email } = request.body;

				const { id } = await createUser({ user: { name, email } });

				return reply.status(201).send({ id });
			} catch (error) {
				console.error("Error creating user:", error);
				return reply.status(500).send({ message: "Internal Server Error" });
			}
		},
	);
};
