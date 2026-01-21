import { env } from "../env.ts";
import { app } from "./app.ts";

app
	.listen({
		port: env.FASTIFY_PORT,
	})
	.then(() => {
		console.log("🚀 Server is running on port", env.FASTIFY_PORT);
	});
