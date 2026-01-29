import { db } from "../../client.ts";
import { usersTable } from "../../schema.ts";

interface CreateUserParams {
	user: {
		name: string;
		email: string;
	};
}

export async function createUser({ user }: CreateUserParams) {
	const result = await db.insert(usersTable).values(user).returning();

	return {
		id: result[0].id,
	};
}
