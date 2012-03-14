(function(define) {
define(['./pile', './MutableCollection', './Map'],
function(pile, MutableCollection, Map) {
    
    var mapProto, forEach, add, contains, _containsKey, remove;

    // Borrow from Map
    mapProto = Map.prototype;
    forEach  = mapProto.forEach;
    add      = mapProto.add;
    contains = mapProto.contains;
    remove   = mapProto.remove;
	_containsKey = mapProto._containsKey;

    function Set(hasher) {
        Map.call(this, hasher);
    }

    Set.prototype = pile.extend(MutableCollection, {

        forEach: function(forEachFunc) {
            return forEach.call(this, function(k, v) {
                forEachFunc(v);
            });
        },

        add: function(item) {
            return add.call(this, item, item);
        },

        contains: contains,
		_containsKey: _containsKey,

        remove: remove

    });

    return Set;

});
})(typeof define != 'undefined' ? define : function(deps, factory) { module.exports = factory.apply(this, deps.map(require)); });
