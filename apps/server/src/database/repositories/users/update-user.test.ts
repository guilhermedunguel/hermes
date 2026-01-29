import { faker } from "@faker-js/faker";
import { expect, it } from "vitest";
import { createUser } from "./create-user.ts";
import { updateUser } from "./update-user.ts";

it("Should be able to update user", async () => {
	const { id } = await createUser({
		user: {
			email: faker.internet.email(),
			name: faker.person.fullName(),
		},
	});

	const newUserData = {
		email: faker.internet.email(),
		name: faker.person.fullName(),
	};

	const result = await updateUser({
		id,
		user: newUserData,
	});

	expect(result).toEqual({
		user: {
			id,
			email: newUserData.email,
			name: newUserData.name,
		},
	});
});
