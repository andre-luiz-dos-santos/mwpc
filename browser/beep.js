'use strict';

// Play the file beep.wav.
// http://www.html5rocks.com/en/tutorials/webaudio/intro/
var beep;
$(function () {
	var context = new AudioContext();

	// Volume control: add this object between the source and the destination.
	//
	// var volume = context.createGain();
	// volume.gain.value = 0.5;

	// A very boring beep sound.
	// I thought this code would be faster on my Android tablet, but it wasn't.
	// My tablet always takes about 200ms to start playing after touch.
	//
	// var oscillator = context.createOscillator();
	// oscillator.type = 'square';
	// oscillator.frequency.value = 250;
	// oscillator.start();
	// var timerId = null;
	// beep = function () {
	// 	if (timerId !== null) {
	// 		clearTimeout(timerId);
	// 	}
	// 	timerId = setTimeout(function () {
	// 		oscillator.disconnect();
	// 	}, 10);
	// 	oscillator.connect(context.destination);
	// }

	var beepBuffer;
	(function () {
		var request = new XMLHttpRequest();
		request.open('GET', 'beep.wav', true);
		request.responseType = 'arraybuffer';
		request.onload = function () {
			context.decodeAudioData(request.response, function (buffer) {
				beepBuffer = buffer;
			}, function (err) {
				alert("The file beep.wav could not be downloaded or decoded.\nError: " + err);
			});
		}
		request.send();
	}());

	beep = function () {
		try {
			var source = context.createBufferSource();
			source.buffer = beepBuffer;
			source.connect(context.destination);
			source.start(0);
		} catch (e) {
			console.log("beep: " + e);
		}
	}
});
