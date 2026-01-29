import { faker } from "@faker-js/faker";
import request from "supertest";
import { beforeAll, expect, it } from "vitest";
import { app } from "../../app.ts";

beforeAll(async () => {
	await app.ready();
});

it("Should get a user by ID", async () => {
	const name = faker.person.fullName();
	const email = faker.internet.email();

	const createdUser = await request(app.server)
		.post("/users")
		.set("Content-Type", "application/json")
		.send({
			name,
			email,
		});

	const result = await request(app.server).get(`/users/${createdUser.body.id}`);

	expect(result.status).toEqual(200);
	expect(result.body).toEqual({
		id: expect.any(Number),
		name,
		email,
	});
});

it("Should return 404 if user not found", async () => {
	const result = await request(app.server).get(`/users/${999999}`);

	expect(result.status).toEqual(404);
	expect(result.body).toEqual({
		message: "User not found",
	});
});
