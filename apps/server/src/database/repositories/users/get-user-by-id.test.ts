import { faker } from "@faker-js/faker";
import { expect, it } from "vitest";
import { createUser } from "./create-user.ts";
import { getUserById } from "./get-user-by-id.ts";

it("Should return user by its id", async () => {
	const insertedUser = await createUser({
		user: {
			name: faker.person.fullName(),
			email: faker.internet.email(),
		},
	});

	const result = await getUserById({ id: insertedUser.id });

	expect(result).toEqual({
		user: {
			id: expect.any(Number),
			name: expect.any(String),
			email: expect.any(String),
		},
	});
});
