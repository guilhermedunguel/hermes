import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { getUsers } from "../../database/repositories/users/get-users.ts";

export const getUsersRoute: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/users",
		{
			schema: {
				tags: ["Users"],
				summary: "Get a paginated list of users",
				querystring: z.object({
					search: z.string().optional(),
					page: z.coerce.number().optional().default(1),
				}),
				response: {
					200: z.object({
						users: z.array(
							z.object({
								id: z.number(),
								name: z.string(),
								email: z.email(),
							}),
						),
						total: z.number(),
					}),
					500: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			try {
				const { search, page } = request.query;

				const { users, total } = await getUsers({ search, page });

				return reply.status(200).send({ users, total });
			} catch (error) {
				console.error("Error fetching users:", error);
				return reply.status(500).send({ message: "Internal Server Error" });
			}
		},
	);
};
