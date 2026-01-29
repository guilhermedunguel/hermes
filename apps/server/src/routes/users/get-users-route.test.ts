import { faker } from "@faker-js/faker";
import request from "supertest";
import { beforeAll, expect, it } from "vitest";
import { app } from "../../app.ts";

beforeAll(async () => {
	await app.ready();
});

it("Should return users with pagination", async () => {
	const name = faker.person.fullName();

	await request(app.server).post("/users").send({
		name,
		email: faker.internet.email(),
	});

	const result = await request(app.server).get(`/users?search=${name}`);

	expect(result.status).toEqual(200);
	expect(result.body).toEqual({
		users: [
			{
				id: expect.any(Number),
				name: name,
				email: expect.any(String),
			},
		],
		total: expect.any(Number),
	});
});
