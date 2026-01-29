import { env } from "../env.ts";
import { app } from "./app.ts";

app
	.listen({
		port: env.FASTIFY_PORT,
	})
	.then(() => {
		console.log("HTTP Server Running at:", env.FASTIFY_PORT);
	});
