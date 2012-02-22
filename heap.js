(function(define) {
define(function() {

	return function binarySearch(arr, item, comparator, found, notFound) {

		var min, max, mid, compare;

		if(!arr.length) {
			return notFound(item, 0, arr);
		}

		min = 0;
		max = arr.length - 1;
		mid = Math.floor((min + max) / 2);

		while(min < max) {
			compare = comparator(item, arr[mid]);
			if(compare < 0) {
				max = mid - 1;
			} else if(compare > 0) {
				min = mid + 1;
			} else {
				return found(item, mid, arr);
			}

			mid = Math.floor((min + max) / 2);
		}

		compare = comparator(item, arr[mid]);
		if(compare == 0) {
			return found(item, mid, arr);
		} else {
			return notFound(item, compare < 0 ? mid : mid+1, arr);
		}
	}

});
})(typeof define != 'undefined' ? define : function(factory) { module.exports = factory(); });
