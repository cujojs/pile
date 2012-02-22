(function(define) {
define(['./pile', './Collection'], function(pile, Collection) {
   
    function subtypeMustImplement() {
        throw new Error("Subtype must implement");
    }
    
    return pile.extend(Collection, {
        add: subtypeMustImplement,
        
        contains: subtypeMustImplement,

        remove: subtypeMustImplement,

		addAll: function(iterable) {
			var self = this;
			iterable.forEach(function(item) { self.add(item); });
		},

        removeAll: function(iterable) {
            var self = this;
            iterable.forEach(function(item) { self.remove(item); });
        },

		/**
		 * Default implementation of retainAll.  This implementation is likely
		 * inefficient for many collection types, and subtypes should override
		 * with a more efficient implementation.
		 *
		 * @param iterable
		 */
		retainAll: function(iterable) {
			// Very inefficient default implementation.
			var self = this;
			iterable.forEach(function(item) {
				if(!self.contains(item)) {
					self.remove(item);
				}
			})
		}
    });

})
})(typeof define != 'undefined' ? define : function(deps, factory) { module.exports = factory.apply(this, deps.map(require)); });
