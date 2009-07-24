/*!
 * jquery.overlay.js 0.2
 *
 * Copyright (c) 2009 Adaptavist.com Ltd
 * Dual licensed under the MIT and GPL licenses.
 *
 * http://www.adaptavist.com/display/free/jQuery+Overlay
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

var toString = Object.prototype.toString;

$.extend({

beget: function( o ) {
	var F = function() {};
	F.prototype = o;
	return new F();
},

overlay: function( original, overlay, allowNulls ) {
	var target = $.beget(original), name, src, copy;
	
	// Create overlays in the new object for all objects that exist in the original
	for ( name in original ) {
		src = original[ name ];
		copy = overlay && overlay[ name ];
			
		// Recurse into objects creating overlays for them too
		if ( toString.call(src) === "[object Object]" ) {
			target[ name ] = arguments.callee( src, copy, allowNulls );
		
		// Copy primitive values and native objects
		} else if ( copy !== undefined && (allowNulls || copy !== null) ) {		
			target[ name ] = copy;
		}
	}
	
	return target;
}

});

})(jQuery);

