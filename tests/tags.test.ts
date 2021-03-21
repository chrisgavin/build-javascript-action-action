import * as tags from "./../src/tags";

describe("test expandTargetTags(...)", () => {
	it("should correctly expand non-prefixed tags", async () => {
		expect(tags.expandTargetTags("1.2.3")).toEqual(["1", "1.2", "1.2.3"]);
	});

	it("should correctly expand prefixed tags", async () => {
		expect(tags.expandTargetTags("v1.2.3")).toEqual(["v1", "v1.2", "v1.2.3"]);
	});

	it("should not expand tags that are unexpandable", async () => {
		expect(tags.expandTargetTags("master")).toEqual(["master"]);
	});
});
