import request from "supertest";
import { beforeAll, describe, expect, it, test } from "vitest";
import { app } from "../app.ts";

describe("plugins/swagger.ts", async () => {
	beforeAll(async () => {
		await app.ready();
	});

	test("GET /docs", async () => {
		const result = await request(app.server).get("/docs").redirects(1);

		expect(result.status).toEqual(200);
	});
});
