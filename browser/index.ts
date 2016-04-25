import jQuery = require('jquery');
window.$ = jQuery;

import './fullscreen';
import './beep';
import './vibrate';
import './keyboard';

$(() => {
	// Load screens from the configuration directory.
	// Start with the lowercase alphabet screen, by hiding all other screens.
	$('#fullscreen').load('/screens', () => {
		$('.screen').not('#screen-alphabet-lowercase').hide();
	});

	// Configuration: Do you want to enter fullscreen mode?
	// Always enter fullscreen mode on mobile devices.
	$('body > div').on('touchstart', () => {
		$('#fullscreen').fullscreen()
	});
});
