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
        extend: function(baseModel, extensions) {
            return mixin(extensions, baseModel);
        }
    }
});
})(typeof define != 'undefined' ? define : function(deps, factory) { module.exports = factory(); });
