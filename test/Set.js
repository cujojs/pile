(function(buster) {

var assert = buster.assert;
var refute = buster.refute;

var Set = require('../Set');

buster.testCase('Set', {

    'should contain have zero length when empty': function() {
        var s = new Set();
        assert.equals(0, s.length);
    },

    'should contain added items': function () {
        var s = new Set();

        s.add('a');

        assert.equals(1, s.length);
        assert(s.contains('a'));
    },

	'should not allow duplicates': function() {
		var s = new Set();

		s.add('a');
		assert.equals(s.length, 1);
		assert(s.contains('a'));

		s.add('a');
		assert.equals(s.length, 1);
	},

	'should not contains remove items': function() {
		var s = new Set();

		s.add('a');

		assert.equals(1, s.length);
		assert(s.contains('a'));

		s.remove('a');

		assert.equals(0, s.length);
		refute(s.contains('a'));
	},

	'should iterate over all items': function() {
		var s, i, expected, results;

		s = new Set();

		expected = [];
		for(i=0; i<10; i++) {
			s.add(i);
			expected.push(i);
		}

		results = [];
		s.forEach(function(val) {
			results.push(val);
		});

		results.sort(function(a, b) {
			return a - b;
		});

		assert.equals(expected, results);
	}

});

})(
	this.buster || require('buster')
);
