var Set = require('../Set');

module.exports = {
    'set should begin empty': function(test) {
        var s = new Set();
        test.equal(0, s.length);
        test.done();
    },

    'set should contain added items':function (test) {
        var s = new Set();
        
        s.add('string');
        
        test.equal(1, s.length);
        test.ok(s.contains('string'));

        test.done();
    }
};