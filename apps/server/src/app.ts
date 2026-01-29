import { fastify } from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { env } from "../env.ts";
import { swaggerConfig } from "./plugins/swagger.ts";
import { getHealthRoute } from "./routes/health-route.ts";
import { createUserRoute } from "./routes/users/create-user-route.ts";
import { getUserByIdRoute } from "./routes/users/get-user-by-id-route.ts";
import { getUsersRoute } from "./routes/users/get-users-route.ts";
import { updateUserRoute } from "./routes/users/update-user-route.ts";

export const app = fastify({
	logger: false,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

env.NODE_ENV !== "production" && app.register(swaggerConfig);

// Health
app.register(getHealthRoute);

// Users
app.register(getUsersRoute);
app.register(createUserRoute);
app.register(getUserByIdRoute);
app.register(updateUserRoute);
