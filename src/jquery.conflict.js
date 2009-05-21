/*!
 * jquery.conflict.js 0.1
 *
 * Copyright (c) 2009 Adaptavist.com Ltd
 * Dual licensed under the MIT and GPL licenses.
 */
/* Tools for a high conflict environment, when using multiple instances/versions of jQuery.
 * 
 * Patches $.globalEval() to temporarily switch the global instance of jQuery to
 * the local instance whilst evaluating a script.
 * Ensures that any loaded script will use the version of jQuery that loaded it.
 */
(function($) {

var globals = ['jQuery', '$'],
	count = 0,
	store,
	globalEval = $.globalEval;

function save() {
	// Save global jQuery/$
	if ( !count++ ) {
		$.each(globals, function() {
			var g = window[this];
			if ( g && g.fn && g.fn.jquery && g !== $ ) {
				store = store || {};
				store[this] = g;
				window[this] = $;
			}
		});
	}
}

function restore() {
	// Restore global jQuery/$
	if ( !--count && store ) {
		$.each(store, function(k, v) {
			window[k] = v;
		});
		store = undefined;
	}
}

$.globalEval = function( data ) {
	save();
	var ret = globalEval.apply(this, arguments);
	restore();
	return ret;
};

})(jQuery);

