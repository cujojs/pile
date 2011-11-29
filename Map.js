(function(define) {
    define(['./collections'], function(collections) {

        function defaultHasher(key) {
            return key;
        }

        function Map(hasher) {
            this._items = {};
            this.length = 0;
            this._hasher = hasher || defaultHasher;
        }

        Map.prototype = {
            forEach: function(forEachFunc) {
                var items = this._items;

                for(var key in items) {
                    forEachFunc(key, items[key]);
                }
            },

            add: function(key, value) {
                var items = this._items;

                key = this._hasher(key);

                if(!(key in items)) {
                    items[key] = value;
                    ++this.length;
                }
            },

            contains: function(key) {
                key = this._hasher(key);
                return key in this._items;
            },

            remove: function(key) {
                var items = this._items;

                key = this._hasher(key);

                if(key in items) {
                    delete items[key];
                    --this.length;
                }
            }
        };

        return Map;

    });
})(typeof define != 'undefined'
    // use define for AMD if available
    ? define
    // If no define, look for module to export as a CommonJS module.
    // If no define or module, attach to current context.
    : typeof module != 'undefined'
    ? function(deps, factory) { module.exports = factory.apply(this, deps.map(require)); }
    : function(deps, factory) { this.Map = factory(this.collections); }
);
