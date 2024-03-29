import { describe, expect, it, vi } from "vitest";

import { detectExistingContributors } from "./detectExistingContributors.js";

const mockGetAllContributorsForRepository = vi.fn();

vi.mock("all-contributors-for-repository", () => ({
	get getAllContributorsForRepository() {
		return mockGetAllContributorsForRepository;
	},
}));

const mock$ = vi.fn();

vi.mock("execa", () => ({
	get $() {
		return mock$;
	},
}));

describe("detectExistingContributors", () => {
	it("runs npx all-contributors add for each contributor and contribution type", async () => {
		mockGetAllContributorsForRepository.mockResolvedValue({
			username: ["bug", "docs"],
		});

		await detectExistingContributors();

		expect(mock$.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    [
			      "npx all-contributors add ",
			      " ",
			      "",
			    ],
			    "username",
			    "0,1",
			  ],
			]
		`);
	});
});
