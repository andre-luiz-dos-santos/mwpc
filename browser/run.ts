import {getAnimationElement} from './animation';

const socket = io();

/**
 * Disconnect the websocket when the page is no longer visible.
 * Avoids sending ping packets constantly.
 */
document.addEventListener("visibilitychange", () => {
	if (document.hidden) {
		socket.emit('hidden', () => {
			socket.disconnect();
		});
	} else {
		socket.connect();
		socket.emit('visible');
	}
});

/**
 * Recognized element attributes:
 * data-type: Send text to server on URL /type/.
 * data-textbox: Send value of input element to URL /type/.
 * data-screen: Switch to another screen.
 */
export function runElementCommands(element: JQuery) {
	const text = element.data('type');
	if (typeof text === 'string') {
		const animation = getAnimationElement(element);
		animation.addClass('live');
		typeText(text, () => {
			animation.removeClass('live');
			try {
				onTyped()
			} catch (e) {
				console.log(`onTyped: ${e}`);
			}
		});
	}
	const screenName = element.data('screen');
	if (typeof screenName === 'string') {
		switchScreen(screenName);
	}
	const textareaId = element.data('textbox');
	if (typeof textareaId === 'string') {
		const textareaEl = $('#'+textareaId);
		const text = textareaEl.val();
		typeText(`textarea ${text}`, () => {
			textareaEl.val('');
			try {
				onTyped()
			} catch (e) {
				console.log(`onTyped: ${e}`);
			}
		});
	}
}

function typeText(text: string, callback: () => void) {
	socket.emit('type', text, callback);
}

function switchScreen(screenName: string) {
	$('.screen').hide();
	$(`#screen-${screenName}`).show();
}

socket.on('screen', (screenName: string) => {
	switchScreen(screenName);
});
