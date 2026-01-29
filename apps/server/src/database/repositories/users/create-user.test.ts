import { faker } from "@faker-js/faker";
import { expect, it } from "vitest";
import { createUser } from "./create-user.ts";

it("Should create a new user in the database", async () => {
	const result = createUser({
		user: {
			name: faker.person.fullName(),
			email: faker.internet.email(),
		},
	});

	await expect(result).resolves.toEqual({ id: expect.any(Number) });
});
