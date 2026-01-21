import fastifySwagger from "@fastify/swagger";
import scalarApiReference from "@scalar/fastify-api-reference";
import fastifyPlugin from "fastify-plugin";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

export const swaggerConfig = fastifyPlugin(async (app) => {
	await app.register(fastifySwagger, {
		openapi: {
			info: {
				title: "Hermes API",
				version: "0.0.1",
			},
		},
		transform: jsonSchemaTransform,
	});

	await app.register(scalarApiReference, {
		routePrefix: "/docs",

		configuration: {
			hiddenClients: true,
			theme: "deepSpace",
			layout: "classic",
		},
	});
});
