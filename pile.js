(function(define) {
define([], function() {

    var emptyObject = {};

    function mixin(dst, src) {
        for(var s in src) {
            if(src.hasOwnProperty(s) && !dst.hasOwnProperty(s) && !(s in emptyObject)) {
                dst[s] = src[s];
            }
        }

        return dst;
    }

    return {
        extend: function(src1 /*, src2, src3... */) {
			var result, src, i;

			result = {};

			for(i = arguments.length - 1; i >= 0; --i) {
				src = arguments[i];
				result = mixin(result, src);

				if(src.hasOwnProperty('toString') && typeof src.toString === 'function') {
					result.toString = src.toString;
				}

			}

			return result;
        }
    }
});
})(typeof define != 'undefined' ? define : function(deps, factory) { module.exports = factory(); });
