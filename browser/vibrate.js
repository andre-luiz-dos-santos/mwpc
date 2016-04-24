var vibrate = ((function () {
    if (typeof navigator.vibrate !== 'function') {
        console.log("'navigator.vibrate' is not a function.");
        return;
    }
    return function () {
        navigator.vibrate(15);
    };
})()
    ||
        (function () {
            console.log("Vibration disabled.");
            return function () { };
        })());
