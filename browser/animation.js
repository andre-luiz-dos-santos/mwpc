'use strict';

function animateKeyElement(animationName, element) {
	const pos = element.position();
	const clone = element.clone();
	clone.css({left: pos.left, top: 0, width: element.width(), height: element.height()});
	clone.appendTo('#fullscreen');
	clone.addClass(`start animation ${animationName}`);
	element.data('animation', clone);
}

// Return true after 'startAnimation' is called, and before 'stopAnimation'.
function hasAnimationElement(element) {
	return element.data('animation') != null;
}

// Return the animation element until 'stopAnimation' is called.
function getAnimationElement(element) {
	return element.data('animation') || $();
}

function startAnimation(element) {
	animateKeyElement('touch', element);
}

function stopAnimation(element) {
	const animation = getAnimationElement(element);
	animation.removeClass('start');
	animation.addClass('end');
	element.removeData('animation');
	setTimeout(function() { animation.remove() }, 1500);
}
