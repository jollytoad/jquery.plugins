/*!
 * jquery.overlay.js 0.1
 *
 * Copyright (c) 2009 Adaptavist.com Ltd
 * Dual licensed under the MIT and GPL licenses.
 */
/* Overlay an object over another using deep prototypal inheritance.
 *
 * Possible use cases:
 * - layered configurations
 * - changes to a JSON object
 *
 * Author: Mark Gibson (jollytoad at gmail dot com)
 */
(function($) {

$.overlay = function( original, overlay ) {
	var ret, k, v;
	
	// Create a new object with the original object as it's prototype
	// and then copy all the properties from the overlay into it.
	function F() {};
	F.prototype = original;
	ret = $.extend(new F(), overlay);
	
	// Create overlays in the new object for all objects that exist in the original
	for ( k in original ) {
		v = original[k];
		if ( v !== null && typeof v === 'object' ) {
			// A recursive call to this function
			ret[k] = arguments.callee(v, overlay && overlay[k]);
		}
	}
	
	return ret;
};

})(jQuery);

