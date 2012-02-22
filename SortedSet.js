(function(define) {
define(['./pile', './MutableCollection', './comparators', './heap'],
function(pile, MutableCollection, comparators, heap) {

	var undef;

	function SortedSet(comparator) {
		this._comparator = comparator || comparators.basic;
		this._items = [];
		this.length = 0;
	}

	SortedSet.prototype = pile.extend(MutableCollection, {

		forEach: function(forEachFunc) {
			var items, i, len;

			items = this._items;
			i = 0;
			len = this._items.length;

			for(; i < len; i++) {
				forEachFunc(items[i], i, this);
			}
		},

		add: function(item) {
			var self = this;

			return heap(this._items, item, this._comparator,
				function() {
					return self.length;
				},
				function(item, insertAt, heap) {
					heap.splice(insertAt, 0, item);
					return (self.length = heap.length);
				}
			);
		},

		contains: function(item) {
			return heap(this._items, item, this._comparator,
				function() { return true; },
				function() { return false; }
			);
		},

		remove: function(item) {
			var self = this;

			return heap(this._items, item, this._comparator,
				function(item, index, heap) {
					heap.splice(index, 1);
					--self.length;
					return item;
				},
				function() {
					return undef;
				}
			);
		}

	});

	return SortedSet;

});
})(typeof define != 'undefined' ? define : function(deps, factory) { module.exports = factory.apply(this, deps.map(require)); });
