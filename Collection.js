(function(define) {
define([], function() {
    
    function array(n) {
        return new Array(n);
    }
    
    return {
        map: function(mapFunc) {
            var results, i;

            i = 0;
            results = array(this.length);

            this.forEach(function(item) {
                results[i++] = mapFunc(item);
            });

            return results;
        },

        filter: function(filterFunc) {
            var results, i;

            i = 0;
            results = array(this.length);

            this.forEach(function(item) {
                if(filterFunc(item)) {
                    results[i++] = item;
                }
            });

            return results;

        },
        
        reduce: function(reduceFunc, initialValue) {
            var result, self, i;
            
            i = 0;
            self = this;
            result = initialValue;
            
            this.forEach(function(item) {
                result = reduceFunc(result, item, i++, self);
            });
            
            return result;
        },
        
        every: function(matchFunc) {
            // unimplemented
        },
        
        some: function(matchFunc) {
            // unimplemented
        },

		join: function(separator) {
			var str, useSeparator;

			str = '';
			this.forEach(function(item) {
				if(useSeparator) {
					str += separator;
				} else {
					useSeparator = true;
				}

				str += item;
			});

			return str;

		},

		toString: function() {
			return '[' + this.join(', ') + ']';
		}

    }
});
})(typeof define != 'undefined' ? define : function(deps, factory) { module.exports = factory(); }
);
