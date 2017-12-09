import jQuery = require('jquery');
window.$ = jQuery;

import './beep';
import './vibrate';
import './keyboard';

$(() => {
	// Load screens from the configuration directory.
	// Start with the lowercase alphabet screen, by hiding all other screens.
	$('#fullscreen').load('/screens', () => {
		$('.screen').not('#screen-alphabet-lowercase').hide();
	});
});
