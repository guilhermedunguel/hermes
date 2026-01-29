import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			enabled: true,
			provider: "v8",
			exclude: ["src/database/schema.ts"],
			thresholds: {
				lines: 80,
				functions: 80,
				branches: 80,
				statements: 80,
			},
		},
	},
});
