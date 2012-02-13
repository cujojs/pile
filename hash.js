(function(define) {
define(function() {

    var slice = Array.prototype.slice;

    function base(item) {
        return item === Object(item)
            ? JSON.stringify(item)
            : item;
    }

    function on(propertyNames) {
        propertyNames = slice.call(arguments);

        var len = propertyNames.length;

        return function(item) {
            var key = '';
            for(var i=0; i<len; i++) {
                key += item[propertyNames[i]];
            }

            return key;
        }
    }

    return {
        base: base,
        on: on
    }

});
})(typeof define != 'undefined' ? define : function(factory) { module.exports = factory(); });
