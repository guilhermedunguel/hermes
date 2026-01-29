import { eq } from "drizzle-orm";
import { db } from "../../client.ts";
import { usersTable } from "../../schema.ts";

interface GetUserByIdParams {
	id: number;
}

export async function getUserById({ id }: GetUserByIdParams) {
	const user = await db
		.select({
			id: usersTable.id,
			name: usersTable.name,
			email: usersTable.email,
		})
		.from(usersTable)
		.where(eq(usersTable.id, id));

	return {
		user: user[0],
	};
}
