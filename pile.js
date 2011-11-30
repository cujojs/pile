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
})
})(typeof define != 'undefined'
    // use define for AMD if available
    ? define
    // If no define, look for module to export as a CommonJS module.
    // If no define or module, attach to current context.
    : typeof module != 'undefined'
    ? function(deps, factory) { module.exports = factory.apply(this, deps.map(require)); }
    : function(deps, factory) { this.collections = factory(this.collections, this.MutableCollection); }
);
