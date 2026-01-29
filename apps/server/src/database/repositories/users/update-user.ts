import { eq, type InferInsertModel } from "drizzle-orm";
import { db } from "../../client.ts";
import { usersTable } from "../../schema.ts";

type UserUpdate = Partial<InferInsertModel<typeof usersTable>>;

interface UpdateUserParams {
	id: number;
	user: UserUpdate;
}

export async function updateUser({ id, user }: UpdateUserParams) {
	const result = await db
		.update(usersTable)
		.set(user)
		.where(eq(usersTable.id, id))
		.returning();

	return {
		user: result[0],
	};
}
