/**
 * Make the selected elements full screen.
 */
$.fn.fullscreen = function (): void {
	return this.each(function () {
		if (typeof this.requestFullscreen === 'function') {
			this.requestFullscreen();
		} else if (typeof this.webkitRequestFullscreen === 'function') {
			this.webkitRequestFullscreen();
		} else if (typeof this.mozRequestFullScreen === 'function') {
			this.mozRequestFullScreen();
		}
	});
};
