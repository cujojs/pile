(function(define) {
define([], function() {

	return {
		slice: function(start, howMany) {},
		splice: function(start, howMany, newItems) {},
		indexOf: function(item) {},
		lastIndexOf: function(item) {},
		push: function(item) {},
		pop: function() {},
		shift: function() {},
		unshift: function() {},

		concat: function(iterable) {
			var self = this;
			iterable.forEach(function(item) {
				self.add(item);
			});
		},

		reverse: function() {}

	}

});
})(typeof define != 'undefined' ? define : function(deps, factory) { module.exports = factory(); }
);
