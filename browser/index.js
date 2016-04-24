var socket = io();
$(function () {
    $('body > div').on('touchstart', function () {
        $('#fullscreen').fullscreen();
    });
});
function runElementCommands(element) {
    var text = element.data('type');
    if (typeof text === 'string') {
        var animation_1 = getAnimationElement(element);
        animation_1.addClass('live');
        typeText(text, function () {
            animation_1.removeClass('live');
            try {
                onTyped();
            }
            catch (e) {
                console.log("onTyped: " + e);
            }
        });
    }
    var screenName = element.data('screen');
    if (typeof screenName === 'string') {
        switchScreen(screenName);
    }
}
function typeText(text, callback) {
    socket.emit('type', text, callback);
}
function switchScreen(screenName) {
    $('.screen').hide();
    $("#screen-" + screenName).show();
}
socket.on('screen', function (screenName) {
    switchScreen(screenName);
});
