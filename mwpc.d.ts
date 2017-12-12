interface IPlatformTypeCallbackFunction {
	(): void
}

interface IPlatformTypeFunction {
	(text: string, callback: IPlatformTypeCallbackFunction): void;
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
