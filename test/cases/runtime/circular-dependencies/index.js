it("should load circular dependencies correctly", function() {
	expect(require("./circular")).toEqual(1);
});
