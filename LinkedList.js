(function(define) {
define(['./pile', './MutableCollection', './Sequence'],
function(pile, MutableCollection, Sequence) {

	var undef;

	function find(head, item, f) {
		var current, prev;

		prev = head;
		current = head.next;

		while(current) {
			if(current.item === item) {
				return f(prev, current);
			}
			prev = current;
			current = current.next;
		}

		return false;
	}

	function insert(after, item) {
		after.next = {
			item: item,
			next: after.next
		};

		return after.next;
	}

	function LinkedList() {
		this.head = this.tail = {};
		this.length = 0;
	}

	LinkedList.prototype = pile.extend(Sequence, MutableCollection, {

		forEach: function(forEachFunc) {
			var current = this.head;
			while(current = current.next) {
				forEachFunc(current.item);
			}
		},

		add: function(item) {
			this.tail = this.tail.next = {
				item: item
			};

			return ++this.length;
		},

		contains: function(item) {
			return find(this.head, item, function() {
				return true;
			});
		},

		get: function(index) {
			var current, i, len;

			i = 0;
			len = this.length;
			current = this.head;
			for(; i < len; i++, current = current.next) {
				if(i === index) {
					return current.item;
				}
			}

			return undef;
		},

		remove: function(item) {
			var self = this;
			return find(this.head, item, function(prev, current) {
				prev.next = current.next;
				--self.length;
				return current.item;
			});
		},

		slice: function(start, howMany) {
			var result;

			result = [];
			this.forEach(function(item, index) {
				if(index >= start && result.length < howMany) {
					result.push(item);
				}
			});

			return result;
		},

		splice: function(start, howMany, newItems) {
			var spliceStart, spliceEnd, i, count;

			i = count = 0;
			spliceStart = this.head;
			while(i < start && spliceStart) {
				spliceStart = spliceStart.next;
				++i;
			}

			if(newItems) {
				newItems.forEach(function(item) {
					spliceStart = insert(spliceStart, item);
				});
				this.length += howMany;
			}

			if(howMany && spliceStart) {
				spliceEnd = spliceStart;
				while(howMany && (spliceEnd = spliceEnd.next)) {
					--howMany;
				}

				spliceStart.next = spliceEnd.next;
			}
		},

		pop: function() {
			return this.remove(this.tail.item);
		},

		shift: function() {
			return this.remove(this.head.next.item);
		},

		unshift: function(item) {
			this.head = this.head.next = {
				item: item,
				next: this.head.next
			};

			return ++this.length;
		}

	});

	LinkedList.prototype.push = LinkedList.prototype.add;

	return LinkedList;

});
})(typeof define != 'undefined' ? define : function(deps, factory) { module.exports = factory.apply(this, deps.map(require)); });
