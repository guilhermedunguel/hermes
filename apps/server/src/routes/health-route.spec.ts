import { describe, expect, it } from "vitest";
import { app } from "../app.ts";

describe("GET /health", () => {
	it("should return 200 status and ok message", async () => {
		app
			.inject({
				method: "GET",
				url: "/health",
			})
			.then((response) => {
				expect(response.statusCode).toBe(200);
				expect(response.json()).toEqual({ status: "ok" });
			});
	});
});
