'use strict';

$(() => {
	// ‘element’ was touched or clicked.
	function onStart(event, element) {
		if (hasAnimationElement(element) === true) {
			console.log("Multiple simultaneous start events are not supported.");
			return; // neither ‘onStop’ nor ‘onAltStop’ has been called yet
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

	// ‘element’ was untouched or unclicked.
	function onStop(event, element) {
		if (hasAnimationElement(element) === false) {
			return; // ‘onAltStop’ has already run
		}
		runElementCommands(element);
		stopTimer(element);
		stopAnimation(element);
	}

	// ‘element’ was touched or clicked for more than ‘alternativeActionAfter’ milliseconds.
	// Happens only on elements for which ‘needTimer’ returns true.
	function onAltStop(element) {
		if (hasAnimationElement(element) === false) {
			console.log("'onStop' should have stopped the element timer.");
			return;
		}
		const altElement = element.next('.alt.key');
		if (altElement.length === 0) {
			console.log("'onStart' should not have started the element timer.");
			return;
		}
		runElementCommands(altElement);
		stopTimer(element);
		stopAnimation(element);
	}

	// The mouse button was not released before the mouse pointer left ‘element’.
	function onCancel(element) {
		stopTimer(element);
		stopAnimation(element);
	}

	// Return true if ‘element’ has an alternative element.
	// ‘startTimer’ should only be called on elements for which this function returns true.
	function needTimer(element) {
		return element.next('.alt.key').length > 0;
	}

	// Start the element timer that calls ‘onAltStop’.
	function startTimer(element) {
		element.data('timerId',
			setTimeout(() => { onAltStop(element) },
				alternativeActionAfter));
	}

	// Stop the timer that calls ‘onAltStop’.
	function stopTimer(element) {
		clearTimeout(
			element.data('timerId'));
	}

	$('body').on('touchstart', '.keyboard .key', onTouchStart);
	$('body').on('touchend', '.keyboard .key', onTouchEnd);
	$('body').on('touchcancel', '.keyboard .key', onTouchCancel);

	function onTouchStart(event) {
		event.preventDefault(); // prevent mousedown from firing on touch events
		const touches = event.originalEvent.changedTouches;
		for (const i = 0; i < touches.length; i++) {
			const element = $(touches[i].target);
			onStart(event, element);
		}
	}

	function onTouchEnd(event) {
		event.preventDefault();
		const touches = event.originalEvent.changedTouches;
		for (const i = 0; i < touches.length; i++) {
			const element = $(touches[i].target);
			onStop(event, element);
		}
	}

	function onTouchCancel(event) {
		event.preventDefault();
		const touches = event.originalEvent.changedTouches;
		for (const i = 0; i < touches.length; i++) {
			const element = $(touches[i].target);
			onCancel(element);
		}
	}

	$('body').on('mousedown', '.keyboard .key', onMouseDown);
	$('body').on('mouseup', '.keyboard .key', onMouseUp);
	$('body').on('mouseout', '.keyboard .key', onMouseOut);

	function onMouseDown(event) {
		event.preventDefault(); // disables drag & drop and text selection
		const element = $(event.target);
		onStart(event, element);
	}

	function onMouseUp(event) {
		event.preventDefault();
		const element = $(event.target);
		onStop(event, element);
	}

	function onMouseOut(event) {
		event.preventDefault();
		const element = $(event.target);
		onCancel(element);
	}
});

// Helper function for keyboard screens.
const quickKeyboardScreen = (() => {
	return function (quick, quicklyBackTo = 'alphabet-lowercase') {
		const clone = quick.clone(); // permanently uppercase
		clone.attr('id', removeSuffix(quick.attr('id')));
		clone.find('[data-screen]').each(function () { removeAttrSuffix($(this), 'data-screen') });
		clone.find(`[data-screen="${screenName(clone)}"]`).attr('data-screen', quicklyBackTo);
		clone.insertAfter(quick);
		quick.find('.key').not('[data-screen]').attr('data-screen', quicklyBackTo);
	}

	function removeSuffix(str) {
		return str.replace(/-quick$/, '');
	}

	function removeAttrSuffix(element, name) {
		element.attr(name, removeSuffix(element.attr(name)));
	}

	function screenName(element) {
		return element.attr('id').replace(/^screen-/, '');
	}
})();
