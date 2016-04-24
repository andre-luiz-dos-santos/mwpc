function animateKeyElement(animationName: string, element: JQuery): void {
	const pos = element.position();
	const clone = element.clone();
	clone.css({ left: pos.left, top: 0, width: element.width(), height: element.height() });
	clone.appendTo('#fullscreen');
	clone.addClass(`start animation ${animationName}`);
	element.data('animation', clone);
}

/**
 * Return true after ‘startAnimation’ and before ‘stopAnimation’ is called.
 */
function hasAnimationElement(element: JQuery): boolean {
	return element.data('animation') != null;
}

/**
 * Return a new jQuery object with the animation element or empty.
 */
function getAnimationElement(element: JQuery): JQuery {
	return element.data('animation') || $();
}

function startAnimation(element: JQuery): void {
	animateKeyElement('touch', element);
}

function stopAnimation(element: JQuery): void {
	const animation = getAnimationElement(element);
	animation.removeClass('start');
	animation.addClass('end');
	element.removeData('animation');
	setTimeout(() => { animation.remove() }, 1500);
}
