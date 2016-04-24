// Vibrate the device.
const vibrate = (
	(() => {
		if (typeof navigator.vibrate !== 'function') {
			console.log("'navigator.vibrate' is not a function.");
			return;
		}
		return function () {
			navigator.vibrate(15);
		};
	})()
	||
	(() => {
		console.log("Vibration disabled.");
		return () => { };
	})()
);
