import { faker } from "@faker-js/faker";
import { expect, it } from "vitest";
import { createUser } from "./create-user.ts";
import { getUsers } from "./get-users.ts";

it("Should return users filtered by search", async () => {
	const name = faker.person.fullName();

	await createUser({
		user: {
			name,
			email: faker.internet.email(),
		},
	});

	const result = await getUsers({ search: name });

	expect(result).toEqual({
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
