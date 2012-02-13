(function(buster) {

	var assert = buster.assert;
	var refute = buster.refute;

	var LinkedList = require('../LinkedList');

	buster.testCase('LinkedList', {

		'should contain have zero length when empty': function() {
			var l = new LinkedList();
			assert.equals(0, l.length);
		},

		'should contain added items': function () {
			var l = new LinkedList();

			l.add('a');

			assert.equals(1, l.length);
			assert(l.contains('a'));
		},

		'should not contains remove items': function() {
			var l = new LinkedList();

			l.add('a');

			assert.equals(1, l.length);
			assert(l.contains('a'));

			l.remove('a');

			assert.equals(0, l.length);
			refute(l.contains('a'));
		},

		'should iterate over all items': function() {
			var l, i, expected, results;

			l = new LinkedList();

			expected = [];
			for(i=0; i<10; i++) {
				l.add(i);
				expected.push(i);
			}

			results = [];
			l.forEach(function(val) {
				results.push(val);
			});

			results.sort(function(a, b) {
				return a - b;
			});

			assert.equals(expected, results);
		},

		'should push item': function() {
			var l = new LinkedList();

			l.push(1);
			assert.equals(l.length, 1);
			assert(l.contains(1));
		},

		'should pop last item': function() {
			var l = new LinkedList();

			l.add(1);
			l.add(2);

			assert.equals(l.length, 2);

			var result = l.pop();
			assert.equals(l.length, 1);
			refute(l.contains(2));
			assert.equals(result, 2);
		},

		'should unshift first item': function() {
			var l = new LinkedList();

			l.add(1);
			l.unshift(2);

			assert.equals(l.length, 2);
			assert.equals(l.get(0), 2);
		},

		'should shift first item': function() {
			var l = new LinkedList();

			l.add(1);
			l.add(2);

			assert.equals(2, l.length);

			var result = l.shift();

			assert.equals(1, l.length);
			assert.equals(result, 1);
			refute(l.contains(1))
		},

		'should be a noop when spliced without howMany and newItems': function() {
			var l = new LinkedList();

			l.add(1);
			l.add(2);
			l.add(3);

			l.splice(1, 0);

			assert.equals(l.length, 3);
			assert(l.contains(1));
			assert(l.contains(2));
			assert(l.contains(3));
		},


		'should remove items when spliced': function() {
			var l = new LinkedList();

			l.add(1);
			l.add(2);
			l.add(3);

			l.splice(1, 1);

			assert(l.contains(1));
			assert(l.contains(3));
			refute(l.contains(2));
		},

		'should add items when spliced': function() {
			var l = new LinkedList();

			l.add(1);
			l.add(2);
			l.add(3);

			l.splice(1, 0, [2.25, 2.5, 2.75]);

			assert(l.length, 6);
			assert(l.contains(2.25));
			assert(l.contains(2.5));
			assert(l.contains(2.75));
		},

		'should add and remove items when spliced': function() {
			var l = new LinkedList();

			l.add(1);
			l.add(2);
			l.add(3);

			l.splice(1, 1, [2.25, 2.5, 2.75]);

			assert(l.length, 6);
			assert(l.contains(2.25));
			assert(l.contains(2.5));
			assert(l.contains(2.75));
			refute(l.contains(2));
		}

	});

})(
	this.buster || require('buster')
);
