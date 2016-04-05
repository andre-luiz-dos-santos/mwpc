'use strict';

// Vibrate the device when a key is touched.
var vibrate;
$(function () {
	if (typeof navigator.vibrate === 'function') {
		vibrate = function () {
			navigator.vibrate(15);
		};
	} else {
		console.log("Cannot vibrate on this device or browser.");
		vibrate = function () {};
	}
});
