(function(define) {
define(['./pile', './Collection'], function(pile, Collection) {
   
    function subtypeMustImplement() {
        throw new Error("Subtype must implement");
    }
    
    return pile.extend(Collection, {
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
})(typeof define != 'undefined' ? define : function(deps, factory) { module.exports = factory.apply(this, deps.map(require)); });
