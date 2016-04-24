function animateKeyElement(animationName, element) {
    var pos = element.position();
    var clone = element.clone();
    clone.css({ left: pos.left, top: 0, width: element.width(), height: element.height() });
    clone.appendTo('#fullscreen');
    clone.addClass("start animation " + animationName);
    element.data('animation', clone);
}
function hasAnimationElement(element) {
    return element.data('animation') != null;
}
function getAnimationElement(element) {
    return element.data('animation') || $();
}
function startAnimation(element) {
    animateKeyElement('touch', element);
}
function stopAnimation(element) {
    var animation = getAnimationElement(element);
    animation.removeClass('start');
    animation.addClass('end');
    element.removeData('animation');
    setTimeout(function () { animation.remove(); }, 1500);
}
