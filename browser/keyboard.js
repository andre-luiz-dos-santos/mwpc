'use strict';

$(function() {

	// Return true if 'element' has an alternative element.
	var needTimer = function (element) {
		return element.next('.alt.key').length > 0;
	}

	var onAltStop; // defined after 'onStop' below

	// Start the element timer that calls 'onAltStop'.
	var startTimer = function (element) {
		element.data('timerId', setTimeout(function () {
			onAltStop(element);
		}, alternativeActionAfter));
	}

	var stopTimer = function (element) {
		clearTimeout(element.data('timerId'));
	}

	var onStart = function (event, element) {
		if (hasAnimationElement(element) === true) {
			console.log("Multiple simultaneous press events are not supported.");
			return; // neither 'onStop' nor 'onAltStop' has been called yet
		}
		try {
			onKeyTouch()
		} catch (e) {
			console.log(`onKeyTouch: ${e}`);
		}
		startAnimation(element);
		if (needTimer(element)) {
			startTimer(element);
		}
	}

	var onTouchStart = function (event) {
		event.preventDefault(); // prevent mousedown from firing on touch events
		var touches = event.originalEvent.changedTouches;
		for (var i = 0; i < touches.length; i++) {
			var element = $(touches[i].target);
			onStart(event, element);
		}
	}

	var onMouseDown = function (event) {
		event.preventDefault(); // prevent drag & drop and selection on mouse events
		var element = $(event.target);
		onStart(event, element);
	}

	var onStop = function (event, element) {
		if (hasAnimationElement(element) === false) {
			return; // 'onAltStop' has already run
		}
		runElementCommands(element);
		stopTimer(element);
		stopAnimation(element);
	}

	onAltStop = function (element) {
		if (hasAnimationElement(element) === false) {
			console.log("'onStop' should have stopped the element timer.");
			return;
		}
		var altElement = element.next('.alt.key');
		if (altElement.length === 0) {
			console.log("'onStart' should not have started the element timer.");
			return;
		}
		runElementCommands(altElement);
		stopTimer(element);
		stopAnimation(element);
	}

	var onTouchEnd = function (event) {
		event.preventDefault();
		var touches = event.originalEvent.changedTouches;
		for (var i = 0; i < touches.length; i++) {
			var element = $(touches[i].target);
			onStop(event, element);
		}
	}

	var onMouseUp = function (event) {
		event.preventDefault();
		var element = $(event.target);
		onStop(event, element);
	}

	var onCancel = function (element) {
		stopTimer(element);
		stopAnimation(element);
	}

	var onTouchCancel = function (event) {
		event.preventDefault();
		var touches = event.originalEvent.changedTouches;
		for (var i = 0; i < touches.length; i++) {
			var element = $(touches[i].target);
			onCancel(element);
		}
	}

	var onMouseOut = function (event) {
		event.preventDefault();
		var element = $(event.target);
		onCancel(element);
	}

	$('body').on('touchstart', '.keyboard .key', onTouchStart);
	$('body').on('mousedown', '.keyboard .key', onMouseDown);
	$('body').on('touchend', '.keyboard .key', onTouchEnd);
	$('body').on('mouseup', '.keyboard .key', onMouseUp);
	$('body').on('touchcancel', '.keyboard .key', onTouchCancel);
	$('body').on('mouseout', '.keyboard .key', onMouseOut);
});

// Helper function for keyboard screens.
const quickKeyboardScreen = (function () {

	const removeSuffix = function (str) {
		return str.replace(/-quick$/, '');
	}

	const removeAttrSuffix = function (element, name) {
		element.attr(name, removeSuffix(element.attr(name)));
	}

	const screenName = function (element) {
		return element.attr('id').replace(/^screen-/, '');
	}

	return function (quick, quicklyBackTo = 'alphabet-lowercase') {
		const clone = quick.clone(); // permanently uppercase
		clone.attr('id', removeSuffix(quick.attr('id')));
		clone.find('[data-screen]').each(function () { removeAttrSuffix($(this), 'data-screen') });
		clone.find(`[data-screen="${screenName(clone)}"]`).attr('data-screen', quicklyBackTo);
		clone.insertAfter(quick);
		quick.find('.key').not('[data-screen]').attr('data-screen', quicklyBackTo);
	}

}());
