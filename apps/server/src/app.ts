import { fastify } from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { swaggerConfig } from "./plugins/swagger.ts";
import { healthRoute } from "./routes/health-route.ts";

export const app = fastify({
	logger: false,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(swaggerConfig);
app.register(healthRoute);
