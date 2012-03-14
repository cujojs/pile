(function(define) {
define(['./hash'], function(hash) {

    function Map(hasher) {
        this._items = {};
        this.length = 0;
        this._hasher = hasher || hash.base;
    }

    Map.prototype = {
        forEach: function(forEachFunc) {
            var items = this._items;

            for(var key in items) {
                forEachFunc(key, items[key]);
            }

            // TODO: return this?
        },

        add: function(key, value) {
            var items = this._items;

			key = this._hasher(key);

            if(!this._containsKey(key)) {
                items[key] = value;
                ++this.length;
            }

            // TODO: return this?
            return this.length;
        },

        contains: function(key) {
			return this._containsKey(this._hasher(key));
        },

		_containsKey: function(key) {
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

            // TODO: return this?
            return removed;
        }
    };

    return Map;

});
})(typeof define != 'undefined' ? define : function(deps, factory) { module.exports = factory.apply(this, deps.map(require)); });
