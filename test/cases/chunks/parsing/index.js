
it("should handle bound function expressions", function(done) {
	require.ensure([], function(require) {
		expect(this).toEqual({ test: true });
		require("./empty?test");
		expect(process.nextTick).toBeInstanceOf(Function); // check if injection still works
		require.ensure([], function(require) {
			expect(this).toEqual({ test: true });
			done();
		}.bind(this));
	}.bind({test: true}));
});

it("should handle require.ensure without function expression", function(done) {
	function f() {
		done();
	}
	require.ensure([], f);
});

it("should parse expression in require.ensure, which isn't a function expression", function(done) {
	require.ensure([], (function() {
		expect(require("./empty?require.ensure:test")).toEqual({});
		return function f() {
			done();
		};
	}()));
});

it("should accept a require.include call", function(done) {
	require.include("./require.include");
	var value = null;
	require.ensure([], function(require) {
		value = require("./require.include");
	});
	setImmediate(function() {
		expect(value).toBe("require.include");
		done();
	});
});
