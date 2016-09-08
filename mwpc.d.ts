interface IPlatformTypeFunction {
	(text: string): void;
}

interface IPlatformBrowserCallbackFunction {
	(eventName: string, eventData: any): void;
}

interface IPlatformBrowserFunction {
	(callback: IPlatformBrowserCallbackFunction): void;
}

interface IPlatform {
	type: IPlatformTypeFunction;
	browser: IPlatformBrowserFunction;
}
