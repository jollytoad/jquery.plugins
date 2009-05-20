/*!
 * jquery.defer.js 0.1
 *
 * Copyright (c) 2009 Adaptavist.com Ltd
 * Dual licensed under the MIT and GPL licenses.
 *
 * Author: Mark Gibson (jollytoad at gmail dot com)
 */
/* Creates callback proxy that defers the real callback for a given delay, any
 * further innvocation of the proxy during that time will reset the delay.
 *
 * Example; to trigger a 'change' event on all text inputs when the user
 * pauses typing:
 *
 *	function handler() {					// An event handler function
 *		$(this).trigger('change');
 *	}
 *	var deferred = $.defer( 333, handler ); // Defer the handler for a third of a second
 *	$(':text').keyup( deferred );			// Bind the event
 *
 * Or, in one line:
 *	$(':text').keyup( $.defer(333, function() { $(this).trigger('change'); }) );
 *
 * The proxy knows nothing and cares not about the arguments passed to it, or
 * the 'this' object, they are all merely passed straight through to the real
 * callback function. So whilst it's greatest use is for event handling, it
 * could be used in any callback situation.
 *
 * This isn't even specific to jQuery, and is only placed into the jQuery
 * namespace as a convenience - feel free to place it elsewhere.
 */
jQuery.defer = function(delay, callback) {
	var timer;
	
	// Return the callback proxy
	return function() {
		// Save the vars for the real callback
		var that = this, args = arguments;
		
		// Reset the delay
		window.clearTimeout(timer);

		// Delay the real callback
		timer = window.setTimeout(function() {		
			callback.apply(that, args);
		}, delay);
	};
};

