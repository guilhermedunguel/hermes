import { faker } from "@faker-js/faker";
import request from "supertest";
import { beforeAll, expect, it } from "vitest";
import { app } from "../../app.ts";

beforeAll(async () => {
	await app.ready();
});

it("Should create a user and return its ID", async () => {
	const result = await request(app.server)
		.post("/users")
		.set("Content-Type", "application/json")
		.send({
			name: faker.person.fullName(),
			email: faker.internet.email(),
		});

	expect(result.status).toEqual(201);
	expect(result.body).toEqual({
		id: expect.any(Number),
	});
});

it("Should not create user if email is already in use", async () => {
	const email = faker.internet.email();

	await request(app.server)
		.post("/users")
		.set("Content-Type", "application/json")
		.send({
			name: faker.person.fullName(),
			email,
		});

	const result = await request(app.server)
		.post("/users")
		.set("Content-Type", "application/json")
		.send({
			name: faker.person.fullName(),
			email,
		});

	expect(result.status).toEqual(500);
	expect(result.body).toEqual({
		message: "Internal Server Error",
	});
});
