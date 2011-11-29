(function(define) {
define(['./collections', './Collection'], function(collections, Collection) {
   
    function subtypeMustImplement() {
        throw new Error("Subtype must implement");
    }
    
    return collections.extend(Collection, {
        add: subtypeMustImplement,
        
        addAll: function(iterable) {
            var self = this;
            iterable.forEach(function(item) { self.add(item); });
        },

        contains: subtypeMustImplement,

        remove: subtypeMustImplement,
        
        removeAll: function(iterable) {
            var self = this;
            iterable.forEach(function(item) { self.remove(item); });
        },
        
        retainAll: subtypeMustImplement
    });

})
})(typeof define != 'undefined'
    // use define for AMD if available
    ? define
    // If no define, look for module to export as a CommonJS module.
    // If no define or module, attach to current context.
    : typeof module != 'undefined'
    ? function(deps, factory) { module.exports = factory.apply(this, deps.map(require)); }
    : function(deps, factory) { this.MutableCollection = factory(this.collections, this.Collection); }
);
