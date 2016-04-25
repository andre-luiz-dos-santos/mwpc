declare var onTyped: () => void;
declare var onKeyTouch: () => void;
declare var alternativeActionAfter: number;

interface Window {
	$: JQueryStatic;
	beep: () => void;
	vibrate: () => void;
	quickKeyboardScreen: (quick: JQuery, quicklyBackTo: string) => void;
}

interface JQuery {
	fullscreen: () => void;
}
