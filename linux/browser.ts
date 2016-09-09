let emit: IPlatformBrowserCallbackFunction | undefined;

const main: IPlatformBrowserFunction = function (callback) {
	emit = callback;
};

export default main;
