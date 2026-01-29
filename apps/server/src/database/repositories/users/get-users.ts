import { ilike } from "drizzle-orm";
import { db } from "../../client.ts";
import { usersTable } from "../../schema.ts";

interface GetUsersParams {
	search?: string;
	page?: number;
	pageSize?: number;
}

export async function getUsers({ search, page, pageSize }: GetUsersParams) {
	const filters = ilike(usersTable.name, `%${search ?? ""}%`);

	const [users, total] = await Promise.all([
		await db
			.select({
				id: usersTable.id,
				name: usersTable.name,
				email: usersTable.email,
			})
			.from(usersTable)
			.where(filters)
			.limit(pageSize ?? 10)
			.offset(((page ?? 1) - 1) * (pageSize ?? 10)),
		await db.$count(usersTable, filters),
	]);

	return { users, total };
}
