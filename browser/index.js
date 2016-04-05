'use strict';

$(function() {
	// Configuration: Do you want to enter fullscreen mode?
	// Always enter fullscreen mode on mobile devices.
	$('body').on('touchstart', function () { $('#fullscreen').fullscreen() });
});

// Recognized element attributes:
// data-type: Send text to server on URL /type/.
// data-screen: Switch to another screen.
function runElementCommands(element) {
	const text = element.data('type');
	if (typeof text === 'string') {
		const animation = getAnimationElement(element);
		animation.addClass('live');
		typeText(text).done(function () {
			animation.removeClass('live');
			try {
				onTyped()
			} catch (e) {
				console.log(`onTyped: ${e}`);
			}
		});
	}
	const screenName = element.data('screen');
	if (typeof screenName === 'string') {
		switchScreen(screenName);
	}
}

function typeText(text) {
	return $.post('type', {text});
}

function switchScreen(screenName) {
	$('.screen').hide();
	$(`#screen-${screenName}`).show();
}
