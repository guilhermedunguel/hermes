import { faker } from "@faker-js/faker";
import request from "supertest";
import { beforeAll, expect, it } from "vitest";
import { app } from "../../app.ts";

beforeAll(async () => {
	await app.ready();
});

it("Should update and return user", async () => {
	const createdUser = await request(app.server).post("/users").send({
		name: faker.person.fullName(),
		email: faker.internet.email(),
	});

	const newUserData = {
		email: faker.internet.email(),
		name: faker.person.fullName(),
	};

	const result = await request(app.server)
		.patch(`/users/${createdUser.body.id}`)
		.send(newUserData);

	expect(result.status).toEqual(200);
	expect(result.body).toEqual({
		id: createdUser.body.id,
		name: newUserData.name,
		email: newUserData.email,
	});
});

it("Should return a error when updating user with invalid data", async () => {
	const email = faker.internet.email();

	await request(app.server).post("/users").send({
		name: faker.person.fullName(),
		email: email,
	});

	const createdUser = await request(app.server).post("/users").send({
		name: faker.person.fullName(),
		email: faker.internet.email(),
	});

	const newUserData = {
		email: email,
		name: faker.person.fullName(),
	};

	const result = await request(app.server)
		.patch(`/users/${createdUser.body.id}`)
		.send(newUserData);

	expect(result.status).toEqual(500);
	expect(result.body).toEqual({
		message: "Internal Server Error",
	});
});
