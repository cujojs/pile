(function(define) {
define(['./collections', './MutableCollection', './Map'],
function(collections, MutableCollection, Map) {

    function defaultHasher(item) {
        return item === Object(item)
            ? JSON.stringify(item)
            : item;
    }

    function Set(hasher) {
        this._map = new Map(hasher || defaultHasher);
    }

    Set.prototype = collections.extend(MutableCollection, {
        forEach: function(forEachFunc) {
            return this._map.forEach(function(k, v) {
                forEachFunc(v);
            });
        },

        add: function(item) {
            this._map.add(item, item);
            this.length = this._map.length;
        },

        contains: function(item) {
            return this._map.contains(item);
        },

        remove: function(item) {
            this._map.remove(item);
            this.length = this._map.length;
        }
    });

    return Set;

});
})(typeof define != 'undefined'
    // use define for AMD if available
    ? define
    // If no define, look for module to export as a CommonJS module.
    // If no define or module, attach to current context.
    : typeof module != 'undefined'
    ? function(deps, factory) { module.exports = factory.apply(this, deps.map(require)); }
    : function(deps, factory) { this.Set = factory(this.collections, this.MutableCollection, this.Map); }
);
