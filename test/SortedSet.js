(function(buster) {

	var assert = buster.assert;
	var refute = buster.refute;

	var SortedSet = require('../SortedSet');

	function compareStrings(a, b) {
		return a.localeCompare(b);
	}

	buster.testCase('SortedSet', {

		'should contain have zero length when empty': function() {
			var s = new SortedSet();
			assert.equals(0, s.length);
		},

		'should contain added items': function () {
			var s = new SortedSet();

			s.add('a');

			assert.equals(1, s.length);
			assert(s.contains('a'));
		},

		'should not allow duplicates': function() {
			var s = new SortedSet();

			s.add('a');
			assert.equals(s.length, 1);
			assert(s.contains('a'));

			s.add('a');
			assert.equals(s.length, 1);
		},

		'should not contains remove items': function() {
			var s = new SortedSet();

			s.add('a');

			assert.equals(1, s.length);
			assert(s.contains('a'));

			s.remove('a');

			assert.equals(0, s.length);
			refute(s.contains('a'));
		},

		'should maintain sorted order when adding': function() {
			var s, expected, results;

			s = new SortedSet();
			expected = [1, 2, 3, 5];

			s.add(3);
			s.add(1);
			s.add(2);
			s.add(5);

			results = [];
			s.forEach(function(item) {
				results.push(item);
			});

			assert.equals(results, expected);
		},

		'should maintain sorted order when removing': function() {
			var s, expected;
			s = new SortedSet();
			expected = [1, 3];

			s.add(3);
			s.add(1);
			s.add(2);

			s.remove(2);

			assert.equals(s.toArray(), expected);
		},

		'should iterate in sorted order': function() {
			var s, expected;

			s = new SortedSet();
			expected = [1, 2, 3];

			s.add(3);
			s.add(1);
			s.add(2);

			s.forEach(function(item, i) {
				assert.equals(item, expected[i]);
			});
		},

		'should use supplied comparator': function() {
			var s;
			s = new SortedSet(function(a, b) {
				return b - a;
			});

			s.add(1);
			s.add(2);
			s.add(3);

			assert.equals(s.toArray(), [3, 2, 1]);
		}

	});

})(
	this.buster || require('buster')
);
