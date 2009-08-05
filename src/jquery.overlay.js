/*!
 * jquery.overlay.js 0.3
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
 * Options:
 * - notNulls - Don't copy null values from the overlay
 * - onlyOwn - Only copy overlays own properties (hasOwnProperty)
 * - notEqual - Don't copy if overlay value is equal to original value
 *
 * Author: Mark Gibson (jollytoad at gmail dot com)
 */
jQuery = Versions.use('jquery','latest');
(function($) {

var toString = Object.prototype.toString;

$.extend({

beget: function( o ) {
	var F = function() {};
	F.prototype = o;
	return new F();
},

overlay: function( original, overlay, options ) {
	var target = $.beget(original), name, src, copy;
	options = options || {};
	
	// Create overlays in the new object for all objects that exist in the original
	for ( name in original ) {
		src = original[ name ];
		copy = overlay && overlay[ name ];
			
		// Recurse into objects creating overlays for them too
		if ( toString.call(src) === "[object Object]" ) {
			target[ name ] = arguments.callee( src, copy, options );
		
		// Copy primitive values and native objects
		} else if ( copy !== undefined &&
					!(options.notNulls && copy === null) &&
					!(options.notEqual && copy === src) &&
					!(options.onlyOwn && !overlay.hasOwnProperty(name)) ) {
	
			target[ name ] = copy;
		}
	}
	
	return target;
}

});

})(jQuery);

