/*!
 * jQuery Parameters 0.1
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT and GPL licenses.
 *
 * Author: Mark Gibson (jollytoad at gmail dot com)
 */
/* Add parameters to a jQuery object which can be used by jQuery functions
 * as default values. The prevObject chain will be a searched when fetching a parameter.
 */
(function($) {

var _end = $.fn.end;

$.fn.extend({

// param(name) - get a parameter
// param(name, value) - set a parameter
// param(object) - set a bunch of parameters at once
param: function( name, value ) {
	var options = name;

	if ( typeof name === "string" ) {
		if ( arguments.length > 1 ) {
			options = {};
			options[ name ] = value;
		} else {
			if ( this.param && this.param[name] ) {
				// Return the parameter
				return this.param[name];
			} else if ( this.prevObject ) {
				// Traverse up the prevObject chain looking for a param
				return this.prevObject.param(name);
			}
			// Nothing found
			return;
		}
	}

	this.param = $.extend(this.param || {}, options);

	return this;
},

// Overriden to ensure that any params are removed.
end: function() {
	delete this.param;
	return _end.apply(this, arguments);
}

});

})(jQuery);

