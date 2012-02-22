(function(define) {
define(function() {

	function defaultComparator(a, b) {
		return a < b ? -1
			: a > b ? 1
			: 0;
	}

	return {
		basic: defaultComparator,

		map: function(mapFunc, comparator) {
			return function(a, b) {
				comparator(mapFunc(a), mapFunc(b));
			}
		},

		reverse: function(comparator) {
			return function(a, b) {
				return -comparator(a, b);
			}
		},

		strings: {
			locale: function compare(a, b) {
				return a.localeCompare(b);
			},

			nocase: function(comparator) {
				return function(a, b) {
					return comparator(a.toLowerCase(), b.toLowerCase());
				}
			},

			nocaseLocale: function(comparator) {
				return function(a, b) {
					return comparator(a.toLocaleLowerCase(), b.toLocaleLowerCase());
				}
			}
		}
	};

});
})(typeof define != 'undefined' ? define : function(factory) { module.exports = factory(); });
