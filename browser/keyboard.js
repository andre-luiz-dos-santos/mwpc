$(function () {
    function onStart(event, element) {
        if (hasAnimationElement(element) === true) {
            console.log("Multiple simultaneous start events are not supported.");
            return;
        }
        try {
            onKeyTouch();
        }
        catch (e) {
            console.log("onKeyTouch: " + e);
        }
        startAnimation(element);
        if (needTimer(element)) {
            startTimer(element);
        }
    }
    function onStop(event, element) {
        if (hasAnimationElement(element) === false) {
            return;
        }
        runElementCommands(element);
        stopTimer(element);
        stopAnimation(element);
    }
    function onAltStop(element) {
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
    function onCancel(element) {
        stopTimer(element);
        stopAnimation(element);
    }
    function needTimer(element) {
        return element.next('.alt.key').length > 0;
    }
    function startTimer(element) {
        element.data('timerId', setTimeout(function () { onAltStop(element); }, alternativeActionAfter));
    }
    function stopTimer(element) {
        clearTimeout(element.data('timerId'));
    }
    $('body').on('touchstart', '.keyboard .key', onTouchStart);
    $('body').on('touchend', '.keyboard .key', onTouchEnd);
    $('body').on('touchcancel', '.keyboard .key', onTouchCancel);
    function onTouchStart(event) {
        event.preventDefault();
        if (event.originalEvent instanceof TouchEvent) {
            var touches = event.originalEvent.changedTouches;
            for (var i = 0; i < touches.length; i++) {
                var element = $(touches[i].target);
                onStart(event, element);
            }
        }
    }
    function onTouchEnd(event) {
        event.preventDefault();
        if (event.originalEvent instanceof TouchEvent) {
            var touches = event.originalEvent.changedTouches;
            for (var i = 0; i < touches.length; i++) {
                var element = $(touches[i].target);
                onStop(event, element);
            }
        }
    }
    function onTouchCancel(event) {
        event.preventDefault();
        if (event.originalEvent instanceof TouchEvent) {
            var touches = event.originalEvent.changedTouches;
            for (var i = 0; i < touches.length; i++) {
                var element = $(touches[i].target);
                onCancel(element);
            }
        }
    }
    $('body').on('mousedown', '.keyboard .key', onMouseDown);
    $('body').on('mouseup', '.keyboard .key', onMouseUp);
    $('body').on('mouseout', '.keyboard .key', onMouseOut);
    function onMouseDown(event) {
        event.preventDefault();
        var element = $(event.target);
        onStart(event, element);
    }
    function onMouseUp(event) {
        event.preventDefault();
        var element = $(event.target);
        onStop(event, element);
    }
    function onMouseOut(event) {
        event.preventDefault();
        var element = $(event.target);
        onCancel(element);
    }
});
var quickKeyboardScreen = (function () {
    return function (quick, quicklyBackTo) {
        if (quicklyBackTo === void 0) { quicklyBackTo = 'alphabet-lowercase'; }
        var clone = quick.clone();
        clone.attr('id', removeSuffix(quick.attr('id')));
        clone.find('[data-screen]').each(function () { removeAttrSuffix($(this), 'data-screen'); });
        clone.find("[data-screen=\"" + screenName(clone) + "\"]").attr('data-screen', quicklyBackTo);
        clone.insertAfter(quick);
        quick.find('.key').not('[data-screen]').attr('data-screen', quicklyBackTo);
    };
    function removeSuffix(name) {
        return name.replace(/-quick$/, '');
    }
    function removeAttrSuffix(element, name) {
        element.attr(name, removeSuffix(element.attr(name)));
    }
    function screenName(element) {
        return element.attr('id').replace(/^screen-/, '');
    }
})();
