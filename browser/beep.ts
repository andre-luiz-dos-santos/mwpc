// Play the file beep.wav.
// http://www.html5rocks.com/en/tutorials/webaudio/intro/
window.beep = (() => {
	const context = new AudioContext();

	let beepBuffer: any;
	{
		const request = new XMLHttpRequest();
		request.open('GET', 'beep.wav', true);
		request.responseType = 'arraybuffer';
		request.onload = () => {
			context.decodeAudioData(request.response,
				buffer => { beepBuffer = buffer },
				err => { alert(`The file beep.wav could not be downloaded or decoded.\nError: ${err}`) });
		};
		request.send();
	}

	return function (): void {
		try {
			const source = context.createBufferSource();
			source.buffer = beepBuffer;
			source.connect(context.destination);
			source.start(0);
		} catch (e) {
			console.log(`beep: ${e}`);
		}
	}
})();
