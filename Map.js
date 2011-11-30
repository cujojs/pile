(function(define) {
define([], function() {

    function defaultHasher(item) {
        return item === Object(item)
            ? JSON.stringify(item)
            : item;
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

            return this.length;
        },

        contains: function(key) {
            key = this._hasher(key);
            return key in this._items;
        },
        
        get: function(key) {
            return this._items[this._hasher(key)];
        },

        remove: function(key) {
            var items, removed;

            items = this._items;

            key = this._hasher(key);

            if (key in items) {
                removed = items[key];
                delete items[key];
                --this.length;
            }

            return removed;
        }
    };

    return Map;

});
})(typeof define != 'undefined' ? define : function(deps, factory) { module.exports = factory(); });
